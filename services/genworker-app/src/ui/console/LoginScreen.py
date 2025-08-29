import time
import getpass
from event_queue import q
from domain.Auth import Auth

class LoginScreen:
  def __init__(self, consoleUI):
    self.consoleUI = consoleUI
    
  def render(self):
    email = input("Email: ")
    password = getpass.getpass("Password: ")
    worker_name = input("Worker name: ")
    
    q.put(('LOGIN', {"email": email, "password": password, "worker_name": worker_name}))
    
    while not Auth.is_logined():
      time.sleep(0.1)
    