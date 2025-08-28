import threading

from .LoginScreen import LoginScreen

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
      "login": LoginScreen(cls)
    }
    threading.Thread(target=cls.worker, daemon=True).start()
    
    return cls