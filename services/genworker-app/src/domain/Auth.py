import requests
from sio.SIO import SIO

class Auth:
  authRepo = None
  authGateway = None
  uiService = None
  taskSchedulerService = None
  
  @classmethod
  def token(cls):
    return cls.authRepo.token
  
  @classmethod
  def user_id(cls):
    return cls.authRepo.user_id
  
  @classmethod
  def worker_name(cls):
    return cls.authRepo.worker_name
  
  @classmethod
  def is_logined(cls):
    return cls.authRepo.token != None
  
  @classmethod
  def init(cls, authRepo, authGateway, uiService, taskSchedulerService):
    cls.authRepo = authRepo
    cls.authGateway = authGateway
    cls.uiService= uiService
    cls.taskSchedulerService = taskSchedulerService
    
  @classmethod
  def login(cls, payload):
    token, userId = cls.authGateway.login(payload["email"], payload["password"])
    cls.authRepo.login(token, userId, payload["worker_name"])
    
    cls.uiService.change_screen("dashboard")
    SIO.init(token)
    cls.taskSchedulerService.init(userId, payload["worker_name"])
    