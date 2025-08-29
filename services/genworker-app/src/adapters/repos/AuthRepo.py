class AuthRepo:
  _token: str|None = None
  _userId: str|None = None
  _worker_name: str|None = None
  
  @property
  def token(self):
    return self._token
  
  @property
  def user_id(self):
    return self._user_id
  
  @property
  def worker_name(self):
    return self._worker_name
  
  def login(self, token, user_id, worker_name):
    self._token = token
    self._user_id = user_id
    self._worker_name = worker_name
    
  def logout(self):
    self._token = None
    self._user_id = None
    
  
