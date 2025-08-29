import requests

class AuthGateway:
  @classmethod
  def login(cls, email, password):
    response = requests.post("http://localhost:3000/api/auth/login", json={
      "email": email,
      "password": password
    }).json()
    
    return (response["accessToken"], response["userId"])