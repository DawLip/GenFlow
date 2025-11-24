import json
import uuid

class TaskRepo:
  def new_task(self, task):
    self.taskId = uuid.uuid4()
    self.projectName = task["projectName"]
    self.flowName = task["flowName"]
    
    self.nodes = task["data"]["nodes"]
    self.edges = task["data"]["edges"]

    
  
