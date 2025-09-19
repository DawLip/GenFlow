import json
import uuid

class TaskRepo:
  def new_task(self, task):
    print("New task received")
    self.taskId = uuid.uuid4()
    self.projectName = task["projectName"]
    self.flowName = task["flowName"]
    
    self.nodes = task["data"]["nodes"]
    self.edges = task["data"]["edges"]
    
    print(json.dumps(task, indent=2, ensure_ascii=False))

    
  
