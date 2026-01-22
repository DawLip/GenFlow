from __future__ import annotations
from typing import Protocol
import multiprocessing as mp

import time
from queue import Queue

from transformers.trainer_utils import is_main_process

from domain.Domain import Domain

from dispatch import dispatch

from ui.UI import UI
from ui.LogLevel import LogLevel

class AppProtocol(Protocol):
    processes: ProcessesProtocol
    process: ManagedProcessProtocol

    domain = None
    ui = None
    console = None

    is_running = bool
    log_level = bool

    def init(self): ...
    def build(self): ...
    def start(self): ...
    def exit(self): ...

class App:  
    def __init__(self, queues, processes: ProcessesProtocol, process: ManagedProcessProtocol):
        self.queues: dict[str, mp.Queue] = queues
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
            try:
                event, payload = self.domain_queue.get(timeout=0.1)
                
                handler = dispatch.get(event)
                if handler: handler(payload)
                else: print("Unknown event:", event)
                
                if event == 'EXIT':
                    break
            except:
                continue

    def exit(self):
        self.is_running = False

        self.process.threading.stop_all_threads()

        self.domain_queue.put(('EXIT', {}))
        self.queues["Worker"].put(('STOP', {}))
         
        for mpp in self.processes.processes:
            if mpp.process and mpp.process.is_alive():
                mpp.process.join(timeout=2)
                if mpp.process.is_alive():
                    mpp.process.terminate()
                    mpp.process.join(timeout=1)
                if mpp.process.is_alive():
                    mpp.process.kill()
                    mpp.process.join(timeout=0.5)
        

        for q in self.processes.queues.values():
            try:
                q.close()
                q.cancel_join_thread()
            except Exception:
                pass
