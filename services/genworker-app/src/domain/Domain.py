from domain.Auth import Auth
from adapters.repos.AuthRepo import AuthRepo
from adapters.gateways.AuthGateway import AuthGateway

from domain.TaskScheduler import TaskScheduler
from adapters.gateways.TaskSchedulerGateway import TaskSchedulerGateway

from ui.UI import UI

class Domain:
  @classmethod
  def init(cls):
    task_scheduler = TaskScheduler(TaskSchedulerGateway(Auth.token), Auth)
    Auth.init(AuthRepo(), AuthGateway(), UI.ui, task_scheduler)