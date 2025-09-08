import json


class TaskRepo:
  def new_task(self, task):
    self.nodes = task["data"]["nodes"]
    self.edges = task["data"]["edges"]
    self.taskId = task["id"]
    self.projectId = task["projectId"]
    self.flowName = task["flowName"]
    self.path = task["path"]
    
    print(json.dumps(task, indent=2, ensure_ascii=False))

    
  
