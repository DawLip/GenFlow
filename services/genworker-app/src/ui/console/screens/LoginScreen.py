import time
import getpass
from event_queue import q
from domain.Auth import Auth

class LoginScreen:
	def __init__(self, ConsoleUI):
		self.ConsoleUI = ConsoleUI
		self.UIM = ConsoleUI.UIM
		self.console = self.UIM.console
		self.email = ""
		self.password = ""
		self.genworker_name =""
  
	def init(self):
		self.UIM.shell_prompt = "[bold blue]email: [/bold blue]"
		self.UIM.shell_function = self.set_login

		# q.put(('TRY_DEFAULT_LOGIN', {}))

		
	def render(self):
		# self.UIM.shell_prompt = "[bold blue]Login Screen: [/bold blue]"
		pass
	
	def set_login(self, cmd):
		self.email = cmd
		self.UIM.shell_prompt = "[bold blue]password: [/bold blue]"
		self.UIM.shell_function = self.set_password

	def set_password(self, cmd):
		self.password = cmd
		self.UIM.shell_prompt = "[bold blue]GenWorker name: [/bold blue]"
		self.UIM.shell_function = self.set_genworker_name

	def set_genworker_name(self, cmd):
		self.genworker_name = cmd
		self.console.log("LoginScreen", "Login attempt:", f"{self.email}, {self.password}, {self.genworker_name}")
		q.put(('LOGIN', {"email": self.email, "password": self.password, "worker_name": self.genworker_name}))
		

		# while True:
		# 	pass
		# email = input("Email: ")
		# password = getpass.getpass("Password: ")
		# worker_name = input("Worker name: ")
		
		# q.put(('LOGIN', {"email": email, "password": password, "worker_name": worker_name}))
		
		# while not Auth.is_logined():
		#   time.sleep(0.1)
    