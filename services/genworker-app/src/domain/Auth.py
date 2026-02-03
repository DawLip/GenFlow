import json

from app.sio.SIO import SIO

class Auth:
	def __init__(self, domain):
		self.domain = domain
	
	def build(self):
		self.auth_repo = self.domain.auth_repo
		self.authGateway = self.domain.auth_gateway
	
	@property
	def token(self):
		return self.auth_repo.token
	
	@property
	def user_id(self):
		return self.auth_repo.user_id
	
	@property
	def worker_name(self):
		return self.auth_repo.worker_name
	
	@property
	def is_logined(self):
		return self.auth_repo.token != None
	
  
	def try_default_login(self, payload = {}):
		if "auth.json" in self.domain.file_system.ls(""):
			auth_data = json.loads(self.domain.file_system.get_file("auth.json"))
			self.auth_repo.login(auth_data["token"], auth_data["user_id"], auth_data["worker_name"], auth_data["email"])

			self.domain.ui.ui.change_screen("dashboard")
			self.domain.sio.init(auth_data["token"], auth_data["worker_name"])
			genworker_id = self.authGateway.register(auth_data["user_id"], auth_data["worker_name"])
			self.authGateway.assign(genworker_id)

			self.auth_repo.setConfig(self.authGateway.get_config(self.auth_repo))

	def login(self, payload):
		token, userId = self.authGateway.login(payload["email"], payload["password"])
		if not (token and userId): 
			self.domain.app.ui_queue.put(("LOGIN_ERROR", {}))
			return

		self.auth_repo.login(token, userId, payload["worker_name"], payload["email"])
		
		self.domain.ui.ui.change_screen("dashboard")
		self.domain.ui.ui.console.log("Auth", "Login success")
		
		self.domain.sio.init(token, payload["worker_name"])
		genworker_id = self.authGateway.register(userId, payload["worker_name"])
		self.authGateway.assign(genworker_id)

		self.domain.file_system.save_file("auth.json", json.dumps({
			"token": token,
			"user_id": userId,
			"worker_name": payload["worker_name"],
			"email": payload["email"]
		}))
		
		self.auth_repo.setConfig(self.authGateway.get_config(self.auth_repo))
