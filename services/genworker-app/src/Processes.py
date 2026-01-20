from __future__ import annotations
from typing import TYPE_CHECKING

from typing import Protocol
import sys
import traceback
import linecache
import shutil

from multiprocessing import Process
from Threading import Threading

class ManagedProcessWorkerProtocol:
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

    def init(self, name, worker: ManagedProcessWorkerProtocol, *args):
        self.name = name
        self.threading = Threading(self.processes) 

        if self.is_main_process: 
            self.process = None
            self.worker_wrapper(worker, *args)
        else:
            self.process = Process(target=self.worker_wrapper, args=(worker, *args))
            self.process.start()
    
    def worker_wrapper(self, worker: ManagedProcessWorkerProtocol,  *args):
        try:
            self.class_process = worker(self.processes, self)
            self.class_process.init()
            self.class_process.build()
            self.class_process.start()
        except Exception as exc:
            self.processes.print_fatal_error(exc)


class ProcessesProtocol(Protocol):
    def init(self): ...
    def create(self): ...
    def print_fatal_error(self, exc): ...
    
class Processes:
    processes: [ManagedProcess] = []
    def __init__(self):
        pass

    def init(self):
        pass
    
    def create(self, name:str, worker: function, *args, is_main_process: bool = False):
        self.processes.append(ManagedProcess(self, is_main_process))
        self.processes[-1].init(name, worker, *args)
    
    def print_fatal_error(self, exc):
        cols, rows = shutil.get_terminal_size()
        err_msg = ""

        R = "\033[0m"
        BOLD = "\033[1m"
        RED     = "\033[31m"
        YELLOW  = "\033[33m"
        BLUE    = "\033[34m"
        PURPLE = "\033[38;2;180;0;255m"

        out = sys.stderr

        err_msg += RED + "=" * cols + f"{R}\n\n\r\x1b[2K"
        err_msg += " "*(cols//2-4)+ f"{PURPLE}{BOLD}GenWorker{R}" + " "*(cols//2-4) + "\n\r\x1b[2K"
        err_msg += " "*(cols//2-5)+ f"{RED}{BOLD}FATAL ERROR{R}" + " "*(cols//2-5) + "\n\r\x1b[2K"
        err_msg += RED + "=" * cols + f"{R}\n\n\r\x1b[2K"

        tb = exc.__traceback__
        frames = traceback.extract_tb(tb) if tb else []

        out.write("Traceback (most recent call last):\n\n\r\x1b[2K")
        for fr_index, fr in enumerate(frames):
            path = fr.filename.split("/src", 1)[-1]
            prev_lines = 6 if fr_index+1 == len(frames) else 2
            past_lines = 3 if fr_index+1 == len(frames) else 1

            code = []
            for i in range(fr.lineno-prev_lines, fr.lineno+past_lines):
                marker = ">>> " if i == fr.lineno else "    "
                color = RED if i == fr.lineno else YELLOW
                code_line = linecache.getline(fr.filename, i).rstrip("\n").strip()
                full_line = f"{marker}{i}: {color}{code_line}{R}"
                code.append(full_line + "\n\r\x1b[2K")

            err_msg += f'F: "{BOLD}{path}{R}"\n\r\x1b[2KLine {RED}{BOLD}{fr.lineno}{R}, in "{BLUE}{BOLD}{fr.name}{R}":\n\r\x1b[2K'
            for line in code:
                err_msg += line

            err_msg += f"\n\r\x1b[2K"

        exc_type = type(exc).__name__
        err_msg += f"{BOLD}{RED}{exc_type}: {exc}{R}\n\n\r\x1b[2K"

        err_msg += RED + "=" * cols + f"{R}\n" + "\n"*10 + "\r\x1b[2K"
        out.write("\n\r\x1b[2K\n" + err_msg)
        out.flush()
