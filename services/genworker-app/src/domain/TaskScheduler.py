import json


class TaskScheduler:
  gateway = None
  domain = None
  taskRepo = None
  
  def __init__(self, domain, gateway, taskRepo):
    self.gateway = gateway
    self.domain = domain
    self.taskRepo = taskRepo
  
  def init(self, user_id, worker_name):
    flows = [{"projectId": "1", "flowName":"1"}]
    
    genworker_id = self.gateway.register(user_id, worker_name)
    self.gateway.assign(genworker_id)
  
  def new_task(self, task_id):
    task = self.gateway.get_task(task_id)
    # print(json.dumps(task, indent=1, ensure_ascii=False))
    self.taskRepo.new_task(task["task"])
    
    
    print(self.taskRepo.nodes)
    