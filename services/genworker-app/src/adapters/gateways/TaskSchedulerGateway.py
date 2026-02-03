import json
import requests

class TaskSchedulerGateway:
  def __init__(self, domain):
    self.domain = domain
  
  def build(self):
    pass
    
  def register(self, owner_id, worker_name):
    response = requests.post("http://localhost:3000/api/task-queue/register", 
      json={
        "ownerId": owner_id,
        "name": worker_name,
        "path": "/test/t/"
      },
      headers={"Authorization": f"Bearer {self.domain.auth.token}"}
    ).json()
    
    return response["genworkerId"]
  
  def assign(self, genworker_id):
    response = requests.post("http://localhost:3000/api/task-queue/genworker-assign", 
      json={"genworkerId": genworker_id},
      headers={"Authorization": f"Bearer {self.domain.auth.token}"}
    ).json()
    
    # print(response)
  
  def get_task(self, task_id):
    response = requests.get(f"http://localhost:3000/api/task-queue/tasks/{task_id}?genworker=1", 
      headers={"Authorization": f"Bearer {self.domain.auth.token}"}
    ).json()
    response["task"]["data"] = json.loads(response["task"]["data"])
    # print("Task data:", response["task"]["data"])
    return response