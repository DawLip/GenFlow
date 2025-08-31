from domain.Auth import Auth
from adapters.repos.AuthRepo import AuthRepo
from adapters.gateways.AuthGateway import AuthGateway

from domain.TaskScheduler import TaskScheduler
from adapters.gateways.TaskSchedulerGateway import TaskSchedulerGateway
from adapters.repos.TaskRepo import TaskRepo

from ui.UI import UI

class Domain:
  task_scheduler = None
  @classmethod
  def init(cls):
    cls.task_scheduler = TaskScheduler(TaskSchedulerGateway(Auth.token), Auth, TaskRepo())
    Auth.init(AuthRepo(), AuthGateway(), UI.ui, cls.task_scheduler)