import time
from queue import Empty


from .ConsoleManager import ConsoleManager
from event_queue import ui_queue

from .screens.LoginScreen import LoginScreen
from .screens.DashboardScreen import DashboardScreen
from .LogParser import LogParser




class consoleUI:
	_screens={}
	current_screen="login"
	frame_rate = 4
	console = None
	dispatch_event_func = None
	

	def __init__(self, app):
		self.app = app
		self.UI = app.ui
		self.domain = app.domain

	def init(self):
		self.UIM = ConsoleManager(self.app, LogParser(self.app))
		self.console = self.UIM.console
  
		self._screens = {
			"login": LoginScreen(self),
			"dashboard": DashboardScreen(self)
		} 

		self.change_screen("login")	
		self.app.threading.create_thread(self.worker, "Screen_Refresher")
		
		return self

	def worker(self, stop_event):
		while not stop_event.is_set():
			event = None
			try: event = ui_queue.get_nowait()
			except Empty: event = None

			if event: self.dispatch_event(event)

			self._screens[self.current_screen].render()
			time.sleep(1/self.frame_rate)

	def dispatch_event(self, event):
		if not self.dispatch_event_func: return
		
		self.dispatch_event_func(event)

	def set_dispatch_event_handler(self, fn):
		self.dispatch_event_func = fn
	
	def change_screen(self, new_screen):
		self.current_screen = new_screen
		self._screens[self.current_screen].init()
		self.console.rerender()
  