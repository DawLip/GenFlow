class TaskScheduler:
  gateway = None
  authService = None
  
  def __init__(self, gateway, authService):
    self.gateway = gateway
    self.authService = authService
  
  def init(self, user_id, worker_name):
    self.gateway.register(user_id, worker_name)