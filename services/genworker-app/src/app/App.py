from __future__ import annotations
from typing import Protocol
import time

import multiprocessing as mp
from queue import Empty, Queue

from transformers.trainer_utils import is_main_process

from domain.Domain import Domain

from app.ui.UI import UI
from app.ui.LogLevel import LogLevel

from processes.Processes import ProcessesProtocol, ManagedProcessProtocol

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

from app.sio.SIO import SIO
from app.WebRTC.WebRTC import WebRTC

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
        self.ui = UI(self)
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

                "auth": Auth(self.domain),
                "file_system": FileSystem(self.domain),
                "packages": Packages(self.domain),
                "projects": Projects(self.domain),

                "sio": SIO(self.domain),
                "webrtc": WebRTC(self.domain)
            }
        )
        self.domain.build()

        
    def start(self):
        self.ui.init("console")
        self.console = self.ui.console
        self.domain.ui = self.ui
        self.domain.console = self.ui.console

        self.domain.init_modules()
        
        while self.is_running:
            event, payload = self.check_queue(self.queues["App"])
            if event is None:
                event, payload = self.check_queue(self.domain_queue)
            if event is None: 
                time.sleep(0.1)
                continue

            if event == 'EXIT':
                break
                
            self.dispatch_event(event, payload)

    def dispatch_event(self, event: str, payload):
        dispatch = {
            "LOGIN": self.domain.auth.login,
            "TRY_DEFAULT_LOGIN": self.domain.auth.try_default_login,
            "CONSOLE": self.console_handler,
            "WEBRTC": self.webrtc_handler
        }

        handler = dispatch.get(event)
        if handler: handler(payload)
        else: print("Unknown event:", event)
    
    def console_handler(self, payload):
        method = getattr(self.console, payload["method"])
        method(*payload["args"])
    
    def webrtc_handler(self, payload):
        for channel in self.domain.webrtc.rooms[payload["rooms"]]:
            self.domain.sio.loop.call_soon_threadsafe(channel.send, payload["payload"])


    def check_queue(self, queue):
        success = False
        try:
            queue_item = queue.get_nowait()
            success=True
        except Empty:
            pass

        if success: return queue_item
        else: return (None, None)


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
