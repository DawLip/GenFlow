from domain.Auth import Auth
from adapters.repos.AuthRepo import AuthRepo
from adapters.gateways.AuthGateway import AuthGateway

from domain.TaskScheduler import TaskScheduler
from adapters.gateways.TaskSchedulerGateway import TaskSchedulerGateway
from adapters.repos.TaskRepo import TaskRepo

from domain.FileSystem import FileSystem
from adapters.repos.FilesRepo import FilesRepo

from ui.UI import UI

class Domain:
  task_scheduler = None
  @classmethod
  def init(cls):
    cls.file_system = FileSystem(cls, FilesRepo())
    cls.task_scheduler = TaskScheduler(cls, TaskSchedulerGateway(Auth.token), TaskRepo())
    cls.auth = Auth.init(cls, AuthRepo(), AuthGateway(), UI.ui)