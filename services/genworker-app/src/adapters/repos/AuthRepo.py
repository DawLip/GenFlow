class AuthRepo:
  def __init__(self, domain):
    self._token: str|None = None
    self._user_id: str|None = None
    self._worker_name: str|None = None
    self._email: str|None = None
    self._config = None

    self.domain = domain
  
  def build(self):
    pass
  
  @property
  def token(self):
    return self._token
  
  @property
  def user_id(self):
    return self._user_id
  
  @property
  def worker_name(self):
    return self._worker_name
  
  @property
  def email(self):
    return self._email
  
  @property
  def config(self):
    return self._config
  
  def login(self, token, user_id, worker_name, email):
    self._token = token
    self._user_id = user_id
    self._worker_name = worker_name
    self._email = email
    
  def logout(self):
    self._token = None
    self._user_id = None
    self.email = None
    self.worker_name = None
    
  def setConfig(self, config):
    self._config = config
    
  
