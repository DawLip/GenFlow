import threading

from .LoginScreen import LoginScreen
from .DashboardScreen import DashboardScreen

class consoleUI:
  _screens={}
  current_screen="login"
  
  @classmethod
  def worker(cls):
    while True:
      cls._screens[cls.current_screen].render()
    
  @classmethod
  def init(cls):
    cls._screens = {
      "login": LoginScreen(cls),
      "dashboard": DashboardScreen(cls)
    }
    threading.Thread(target=cls.worker, daemon=True).start()
    
    return cls
  
  @classmethod
  def change_screen(cls, new_screen):
    cls.current_screen = new_screen
  