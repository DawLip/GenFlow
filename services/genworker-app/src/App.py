from __future__ import annotations
from typing import Protocol

from queue import Queue

from torch.distributions.constraints import boolean
from transformers.trainer_utils import is_main_process

from domain.Domain import Domain

from dispatch import dispatch

from ui.UI import UI
from ui.LogLevel import LogLevel


from Processes import Processes, ProcessesProtocol, ManagedProcessProtocol

class AppBuilder:
    processes: ProcessesProtocol

    def __init__(self):
        pass

    def init(self):
        self.processes = Processes()

    def build(self):
        self.processes.init()
        
        self.processes.create("App", App, is_main_process=True)
        # self.processes.create("App", Worker)


class AppProtocol(Protocol):
    processes: ProcessesProtocol
    process: ManagedProcessProtocol

    domain = None
    ui = None
    console = None

    is_running = boolean
    log_level = boolean

    def init(self): ...
    def build(self): ...
    def start(self): ...
    def exit(self): ...

class App:  
    def __init__(self, processes: ProcessesProtocol, process: ManagedProcessProtocol):
        self.processes = processes
        self.process = process

    def init(self):
        self.is_running = True
        self.log_level = LogLevel.DEBUG
        self.ui_queue = Queue()
        self.domain_queue = Queue()
    
    def build(self):
        self.domain = Domain(self)
        self.ui = UI(self)
        
    def start(self):
        self.ui.init("console")
        self.console = self.ui.console
        self.domain.init()
        
        while self.is_running:
            event, payload = self.domain_queue.get()
            
            handler = dispatch.get(event)
            if handler: handler(payload)
            else: print("Unknown event:", event)

    def exit(self):
        self.process.threading.stop_all_threads()
        self.domain_queue.put(('EXIT', {}))
        self.is_running = False