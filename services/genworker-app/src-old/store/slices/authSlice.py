import requests
import asyncio
    
class AuthSlice:
  def __init__(self, store):
    self.s = store
    self.token: str|None = None
    self.userId: str|None = None
    
  def login(self, email, password):
    # response = requests.post("http://localhost:3000/api/auth/login", json={
    #   "email": email,
    #   "password": password
    # }).json()
    # print(response)
    # if not response["res"]["ok"]:
      
    #   return
    
    # self.token = response["accessToken"]
    # self.userId = response["userId"]
    self.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTYxNGE2MDZmN2EzN2E3MjA3OWU3YiIsImlhdCI6MTc1NTA1Mjk3MywiZXhwIjoyMzAzNDY4MTYxNzN9.wNBc-8ZDUqmUVCaH96TbAMhogFTXrBGqM7qF_yuxgOI"
    
    asyncio.create_task(self.s.io_queue.ui_in.put(('login_success', {"test":"t"})))
    # asyncio.get_running_loop().call_soon_threadsafe(self.s.io_queue.ui_in.put_nowait, ('login_success', {}))