import json
from sio.SIO import SIO

class Auth:
	authRepo = None
	authGateway = None
	uiService = None
	taskSchedulerService = None
	
	@classmethod
	def token(cls):
		return cls.authRepo.token
	
	@classmethod
	def user_id(cls):
		return cls.authRepo.user_id
	
	@classmethod
	def worker_name(cls):
		return cls.authRepo.worker_name
	
	@classmethod
	def is_logined(cls):
		return cls.authRepo.token != None
	
	@classmethod
	def init(cls, domain, authRepo, authGateway, uiService):
		cls.authRepo = authRepo
		cls.authGateway = authGateway
		cls.uiService= uiService
		cls.domain = domain
  
	@classmethod
	def try_default_login(cls):
		if "auth.json" in cls.domain.file_system.ls(""):
			auth_data = json.loads(cls.domain.file_system.get_file("auth.json"))
			cls.authRepo.login(auth_data["token"], auth_data["user_id"], auth_data["worker_name"])

			cls.uiService.change_screen("dashboard")
			cls.domain.SIO = SIO.init(cls.domain, auth_data["token"], auth_data["worker_name"])
			cls.domain.task_scheduler.init(auth_data["user_id"], auth_data["worker_name"])

			cls.authRepo.setConfig(cls.authGateway.get_config(cls.authRepo))

	@classmethod
	def login(cls, payload):
		token, userId = cls.authGateway.login(payload["email"], payload["password"])
		cls.authRepo.login(token, userId, payload["worker_name"])
		
		cls.uiService.change_screen("dashboard")
		cls.domain.SIO = SIO.init(cls.domain, token, payload["worker_name"])
		cls.domain.task_scheduler.init(userId, payload["worker_name"])

		cls.domain.file_system.save_file("auth.json", json.dumps({
		"token": token,
		"user_id": userId,
		"worker_name": payload["worker_name"]
		}))
		
		cls.authRepo.setConfig(cls.authGateway.get_config(cls.authRepo))
