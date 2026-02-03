from __future__ import annotations
from typing import TYPE_CHECKING, Callable, Type

from typing import Protocol

from multiprocessing import Process, Queue, set_start_method
from .Threading import Threading

from ._worker_entry import _worker_entry
from .ExceptionHandler import ExceptionHandler

class ManagedProcessWorkerProtocol(Protocol):
    def init(self):...
    def build(self):...
    def start(self):...

class ManagedProcessProtocol(Protocol):
    processes: Processes
    name: str
    process: Process
    threading: Threading
    is_main_process: bool

    def worker_wrapper(self): ...

class ManagedProcess:
    def __init__(self, processes: Processes, is_main_process=False):
        self.processes = processes
        self.is_main_process = is_main_process

    def init(self, name, worker_cls: ManagedProcessWorkerProtocol, *args):
        self.name = name
        self.threading = Threading(self.processes) 
        self.worker_cls = worker_cls
        self.worker_args = args

    def start(self):
        queues = self.processes.queues 
        if self.is_main_process: 
            self.process = None
            _worker_entry(self.worker_cls, self.name, worker_cls_args=(queues, self.processes, self, *self.worker_args))
        else:
            set_start_method("spawn", force=True)
            self.process = Process(target=_worker_entry, args=(self.worker_cls, self.name, (queues, *self.worker_args)))
            self.process.start()


class ProcessesProtocol(Protocol):
    processes: [ManagedProcess]

    def init(self): ...
    def create(self): ...
    def print_fatal_error(self, exc): ...
    
class Processes:
    def __init__(self):
        self.processes: [ManagedProcess] = []
        self.queues: dict[str, Queue] = {}
        self.exception_handler = ExceptionHandler()

    def init(self):
        pass
    
    def create(self, name:str, worker: Callable, *args, is_main_process: bool = False):
        self.queues[name] = Queue()
        self.processes.append(ManagedProcess(self, is_main_process))
        self.processes[-1].init(name, worker, *args)
    
    def start(self):
        for process in self.processes:
            process.start()
    
    def print_fatal_error(self, exc):
        self.exception_handler.print_fatal_error(exc)
