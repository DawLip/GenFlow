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


class Domain:
  app = None

  task_scheduler = None
  task_repo = None
  node_repo = None
  file_repo = None
  authRepo = None

  Node = None

  file_system = None
  packages = None
  auth = None
  cpu_worker = None
  projects = None

  sio = None
  webrtc = None
  def __init__(self, app) -> None:
    self.app = app

  def init(self):
    self.ui = self.app.ui
    self.console = self.ui.console

    self.task_repo = TaskRepo()
    self.node_repo = NodeRepo(self.app)
    self.file_repo = FilesRepo()
    self.authRepo = AuthRepo()
    
    self.Node = Node(self)

    self.file_system = FileSystem(self, self.file_repo)
    self.task_scheduler = TaskScheduler(self, TaskSchedulerGateway(Auth.token), self.task_repo)
    self.packages = Packages(self, PackagesGateway.init(self))
    self.auth = Auth.init(self, self.authRepo, AuthGateway(), self.ui.ui)
    self.cpu_worker = CpuWorker(self)
    self.projects = Projects(self)
