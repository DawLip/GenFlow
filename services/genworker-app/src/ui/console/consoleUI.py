import threading

from .ConsoleManager import ConsoleManager

from .screens.LoginScreen import LoginScreen
from .screens.DashboardScreen import DashboardScreen
from .LogParser import LogParser

import time

class consoleUI:
	_screens={}
	current_screen="login"
	
	@classmethod
	def worker(cls):
		while True:
			cls._screens[cls.current_screen].render()
			time.sleep(0.05)

		
	@classmethod
	def init(cls):
		cls.UIM = ConsoleManager(LogParser())
		cls.console = cls.UIM.console
  
		cls._screens = {
			"login": LoginScreen(cls),
			"dashboard": DashboardScreen(cls)
		} 

		cls.change_screen("login")	
  
		threading.Thread(target=cls.worker, daemon=True).start()
		
		return cls
	
	@classmethod
	def change_screen(cls, new_screen):
		cls.current_screen = new_screen
		cls._screens[cls.current_screen].init()
  