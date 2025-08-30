import requests

class TaskSchedulerGateway:
  def __init__(self, token):
    self._token = token
    
  def register(self, owner_id, worker_name):
    response = requests.post("http://localhost:3000/api/task-queue/register", 
      json={
        "ownerId": owner_id,
        "name": worker_name,
        "path": "/test/t/"
      },
      headers={"Authorization": f"Bearer {self._token()}"}
    ).json()
    
    print(response)
  
  def assign(self, user_id, worker_name, flows):
    response = requests.post("http://localhost:3000/api/task-queue/genworker-assign", 
      json={
        "genworkerId": f"{user_id}:{worker_name}",
        "workerPools": [ f"{f['projectId']}:/{f['flowName']}:worker_pool" for f in flows]
      },
      headers={"Authorization": f"Bearer {self._token()}"}
    ).json()
    
    print(response)