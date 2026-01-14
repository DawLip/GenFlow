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

from ui.UI import UI

from domain.Projects import Projects


class Domain:
  task_scheduler = None
  @classmethod
  def init(cls):
    cls.task_repo = TaskRepo()
    cls.node_repo = NodeRepo(cls)
    cls.file_repo = FilesRepo()
    cls.authRepo = AuthRepo()
    
    cls.Node = Node(cls)

    cls.file_system = FileSystem(cls, cls.file_repo)
    cls.task_scheduler = TaskScheduler(cls, TaskSchedulerGateway(Auth.token), cls.task_repo)
    cls.packages = Packages(cls, PackagesGateway.init(cls))
    cls.auth = Auth.init(cls, cls.authRepo, AuthGateway(), UI.ui)
    cls.cpu_worker = CpuWorker(cls)
    cls.projects = Projects(cls)
