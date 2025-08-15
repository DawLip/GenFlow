from store.store import Store
import requests

async def login(email, password):
  payload = {
    'email': email,
    'password': password
  }
  response = requests.post('http://localhost:3000/api/auth/login', json=payload).json()

  Store().auth['accessToken'] = response['accessToken']
  Store().auth['userId'] = response['userId']

  return response['accessToken']