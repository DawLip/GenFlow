from __future__ import annotations
from typing import Protocol

from multiprocessing import Queue
from queue import Empty

from domain.Domain import Domain

from domain.Auth import Auth
from adapters.repos.AuthRepo import AuthRepo
from adapters.gateways.AuthGateway import AuthGateway

from domain.TaskScheduler import TaskScheduler
from adapters.gateways.TaskSchedulerGateway import TaskSchedulerGateway
from adapters.repos.TaskRepo import TaskRepo

from domain.FileSystem import FileSystem
from adapters.repos.FilesRepo import FilesRepo

from domain.Packages import Packages
from adapters.gateways.PackagesGateway import PackagesGateway

from domain.CpuWorker import CpuWorker

from domain.Node import Node
from adapters.repos.NodeRepo import NodeRepo

from domain.Projects import Projects

class Console:
    def __init__(self, app):
        self.app = app

    def debug(self, source, event, data="", json=False):
        self.app.queues["App"].put(("CONSOLE", {"method": "debug", "args": (source, event, data, json)}))

    def trace(self, source, event, data="", json=False):
        self.app.queues["App"].put(("CONSOLE", {"method": "trace", "args": (source, event, data, json)}))

    def log(self, source, event, data="", json=False):
        self.app.queues["App"].put(("CONSOLE", {"method": "log", "args": (source, event, data, json)}))

    def warn(self, source, event, data="", json=False):
        self.app.queues["App"].put(("CONSOLE", {"method": "warn", "args": (source, event, data, json)}))

    def error(self, source, event, data="", json=False):
        self.app.queues["App"].put(("CONSOLE", {"method": "error", "args": (source, event, data, json)}))

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
        self.console = Console(self)

    def init(self):
        self.is_running = True
    
    def build(self):
        self.domain = Domain(self)
        self.domain.init(
            {
                "task_repo": TaskRepo(self.domain),
                "node_repo": NodeRepo(self.domain),
                "files_repo": FilesRepo(self.domain),
                "auth_repo": AuthRepo(self.domain),

                "packages_gateway": PackagesGateway(self.domain),
                "auth_gateway": AuthGateway(self.domain),
                "task_sheduler_gateway": TaskSchedulerGateway(self.domain),

                "Node": Node(self.domain),
                # "auth": Auth(self.domain),
                "file_system": FileSystem(self.domain),
                "task_scheduler": TaskScheduler(self.domain),
                "packages": Packages(self.domain),
                "cpu_worker": CpuWorker(self.domain),
                "projects": Projects(self.domain),

            }
        )
        self.domain.console = self.console
        self.domain.build()
        
    def start(self):
        self.domain.init_modules()
        # try:
        while self.is_running:
            try:
                event, payload = self.queues["Worker"].get(timeout=0.1)
            except Empty:
                continue

            if(event == "EXECUTE_FLOW"):
                    payload["task_id"] = str(payload["task_id"])
                    self.console.log("Worker", event, payload, True)
                    self.domain.task_scheduler.execute_flow(payload)

            if(event == "STOP"):
                self.is_running = False
                break
        # except Exception as exp:
        #     self.