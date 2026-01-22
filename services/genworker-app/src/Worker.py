from __future__ import annotations
from typing import Protocol

from multiprocessing import Queue
from queue import Empty

from transformers.trainer_utils import is_main_process

from domain.Domain import Domain

from dispatch import dispatch

from ui.UI import UI
from ui.LogLevel import LogLevel

class WorkerProtocol(Protocol):
    is_running = bool
    log_level = bool

    def init(self): ...
    def build(self): ...
    def start(self): ...
    def exit(self): ...

class Worker:
    def __init__(self, queues):
        self.queues: dict[str, Queue] = queues

    def init(self):
        self.is_running = True
        # self.ui_queue = Queue()
        # self.domain_queue = Queue()
    
    def build(self):
        # self.domain = Domain(self)
        # self.ui = UI(self)
        pass
        
    def start(self):
        while self.is_running:
            try:
                event, payload = self.queues["Worker"].get(timeout=0.1)
            except Empty:
                continue
            print(event)
            print(payload)
            if(event == "STOP"):
                self.is_running = False
                break

        # try:
        #     self.queues["Worker"].cancel_join_thread()
        # except:
        #     pass
            
            
            # handler = dispatch.get(event)
            # if handler: handler(payload)
            # else: print("Unknown event:", event)