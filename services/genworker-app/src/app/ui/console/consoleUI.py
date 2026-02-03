from __future__ import annotations
from typing import TYPE_CHECKING, Protocol, Any
if TYPE_CHECKING:
	from App import AppProtocol
	from ..UI import UIProtocol

import time
from queue import Empty

from .ConsoleManager import ConsoleManager, ConsoleManagerProtocol
from .LogParser import LogParser

from .screens.LoginScreen import LoginScreen
from .screens.DashboardScreen import DashboardScreen

class ScreenProtocol(Protocol):
	UIM: ConsoleManagerProtocol

	def init(self): ...
	def render(self): ...

class XUIProtocol(Protocol):
	_screens: dict
	current_screen:str
	frame_rate: int
	console: Any
	dispatch_event_func: function

	app: AppProtocol
	ui: UIProtocol

class consoleUI:
	_screens={}
	current_screen="login"
	frame_rate = 4
	console = None
	dispatch_event_func = None
	

	def __init__(self, app: AppProtocol):
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
		self.app.process.threading.create_thread(self.worker, "Screen_Refresher")
		
		return self

	def worker(self, stop_event):
		while not stop_event.is_set():
			event = None
			try: event = self.app.ui_queue.get_nowait()
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
  