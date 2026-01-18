class AuthRepo:
  _token: str|None = None
  _user_id: str|None = None
  _worker_name: str|None = None
  _email: str|None = None
  _config = None
  
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
    # print("Setting config :", config)
    self._config = config
    
  
