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


class Domain:
  task_scheduler = None
  @classmethod
  def init(cls):
    cls.task_repo = TaskRepo()
    cls.node_repo = NodeRepo(cls)
    cls.file_repo = FilesRepo()
    
    cls.Node = Node(cls)

    cls.file_system = FileSystem(cls, cls.file_repo)
    cls.task_scheduler = TaskScheduler(cls, TaskSchedulerGateway(Auth.token), cls.task_repo)
    cls.auth = Auth.init(cls, AuthRepo(), AuthGateway(), UI.ui)
    cls.packages = Packages(cls, PackagesGateway.init(cls))
    cls.cpu_worker = CpuWorker(cls)