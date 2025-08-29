import requests

class TaskSchedulerGateway:
  def __init__(self, token):
    self._token = token
    
  def register(self, owner_id, worker_name):
    print(self._token())
    response = requests.post("http://localhost:3000/api/task-queue/register", 
      json={
        "ownerId": owner_id,
        "name": worker_name,
        "path": "/test/t/"
      },
      headers={"Authorization": f"Bearer {self._token()}"}
    ).json()
    print(response)
    return True
  