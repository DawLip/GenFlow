from __future__ import annotations
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from Processes import ProcessesProtocol

import threading


class Thread:
    processes: processes
    
    def __init__(self, processes: ProcessesProtocol):
        self.processes = processes

    def init(self, worker, name, id, args=()):
        self.id = id
        self.name = name
        self.stop_event = threading.Event()
        self.worker = worker

        self.thread = threading.Thread(
            target=self.worker_wrapper, 
            daemon=True, 
            args = (self.stop_event, *args)
        )
        self.thread.start()
    
    def worker_wrapper(self, *args):
        try:
            self.worker(*args)
        except Exception as exp:
            self.processes.print_fatal_error(exp)

    def stop(self):
        self.stop_event.set()

class Threading:
    processes: ProcessesProtocol
    threads = []
    next_id = 0
    def __init__(self, processes: ProcessesProtocol):
        self.processes = processes

    def create_thread(self, worker, name = None, args = ()):
        if not name: name = len(self.threads) + 1

        new_thread = Thread(self.processes)
        new_thread.init(worker, name, self.next_id, args = args)
        self.threads.append(new_thread)
        self.next_id += 1

    def stop_all_threads(self):
        for t in self.threads:
            t.stop()
    
    def show_raport(self):
        pass        # for t in self.threads:
        #     if t.thread.is_alive(): self.app.console.log("Threading", f"Thread {t.id} status - {t.name}:", "[green]OK[/green]" )
        #     else: self.app.console.error("Threading", f"Thread {t.id} status - {t.name}:", "[red]DEAD[/red]")
