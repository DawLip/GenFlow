import requests

class AuthGateway:
  def __init__(self, domain):
    self.domain = domain
  
  def build(self):
    pass
    
  def login(cls, email, password):
    response = requests.post("http://localhost:3000/api/auth/login", json={
      "email": email,
      "password": password
    }).json()
    
    if response["res"]["ok"]:
      return (response["accessToken"], response["userId"])
    return (False, False)
  

  def get_config(cls, authRepo):
    response = requests.get(f"http://localhost:3000/api/task-queue/genworker/{authRepo.user_id}:{authRepo.worker_name}", headers={
      "Authorization": f"Bearer {authRepo.token}"
    }).json()
        
    return (response["genworker"])

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