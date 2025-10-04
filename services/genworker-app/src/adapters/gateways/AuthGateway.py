import requests

class AuthGateway:
  @classmethod
  def login(cls, email, password):
    response = requests.post("http://localhost:3000/api/auth/login", json={
      "email": email,
      "password": password
    }).json()
    
    return (response["accessToken"], response["userId"])
  
  @classmethod
  def get_config(cls, authRepo):
    response = requests.get(f"http://localhost:3000/api/task-queue/genworker/{authRepo.user_id}:{authRepo.worker_name}", headers={
      "Authorization": f"Bearer {authRepo.token}"
    }).json()
    
    return (response["genworker"])