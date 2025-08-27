class Store:
  _instance = None

  def __new__(cls):
    if cls._instance is None:
      cls._instance = super().__new__(cls)
      cls._instance.auth = {
        'accessToken': '',
        'userId': ''
      }
    return cls._instance