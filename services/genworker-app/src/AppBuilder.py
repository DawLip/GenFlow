from __future__ import annotations

from App import App
from Worker import Worker


from processes.Processes import Processes, ProcessesProtocol, ManagedProcessProtocol

class AppBuilder:
    processes: ProcessesProtocol

    def __init__(self):
        pass

    def init(self):
        self.processes = Processes()

    def build(self):
        self.processes.init()
        
        self.processes.create("Worker", Worker)
        self.processes.create("App", App, is_main_process=True)
    
        self.processes.start()