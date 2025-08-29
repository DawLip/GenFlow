import getpass
from event_queue import q

class DashboardScreen:
  def __init__(self, consoleUI):
    self.consoleUI = consoleUI
    
  def render(self):
    print("dashboard")
    cmd = input("cmd: ")