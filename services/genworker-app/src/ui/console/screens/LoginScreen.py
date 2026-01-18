import time
import getpass
from event_queue import domain_queue
from domain.Auth import Auth
from ..ConsoleManager import ConsoleManager
from rich.align import Align


class LoginScreen:
	error_message = None

	def __init__(self, ConsoleUI):
		self.ConsoleUI = ConsoleUI
		self.UIM: ConsoleManager = ConsoleUI.UIM
		self.console = self.UIM.console
		self.email = ""
		self.password = ""
		self.genworker_name =""
  
	def init(self):
		self.UIM.shell_prompt = "[bold blue]email: [/bold blue]"
		self.UIM.shell_function = self.set_login
		self.UIM.render_UI = self.render_UI
		self.UIM.app.ui.ui.set_dispatch_event_handler(self.dispatch_event_func)

		domain_queue.put(('TRY_DEFAULT_LOGIN', {}))
		
	def render(self):
		self.console.soft_rerender()

	def render_UI(self):
		cols = self.UIM.cols()
		ui = [
			"="*cols,
			"",
			Align.center("Login to your [purple bold]GenFlow[/purple bold] account", width=cols),
			"",
			"="*cols,
		]

		if self.error_message:
			ui.insert(3, "")
			ui.insert(4, Align.center(f"[red]{self.error_message}[/red]", width=cols))

		return ui

	def dispatch_event_func(self, event):
		event_name, payload = event

		if event_name == "LOGIN_ERROR": 
			self.UIM.shell_prompt = "[bold blue]email: [/bold blue]"
			self.UIM.shell_function = self.set_login
			self.error_message = "wrong email or password"

		self.console.rerender()

	
	def set_login(self, cmd):
		self.email = cmd
		self.UIM.shell_prompt = "[bold blue]password: [/bold blue]"
		self.UIM.shell_function = self.set_password
		self.error_message = None

	def set_password(self, cmd):
		self.password = cmd
		self.UIM.shell_prompt = "[bold blue]GenWorker name: [/bold blue]"
		self.UIM.shell_function = self.set_genworker_name

	def set_genworker_name(self, cmd):
		self.genworker_name = cmd
		self.console.log("LoginScreen", "Login attempt...", "")

		domain_queue.put(('LOGIN', {"email": self.email, "password": self.password, "worker_name": self.genworker_name}))

		self.UIM.shell_function = self.set_login
		self.UIM.shell_prompt = "[bold blue]password: [/bold blue]"
		