import requests

class PackagesGateway:
  domain = None
  
  @classmethod
  def init(cls, domain):
    cls.domain = domain
    return cls

  @classmethod
  def genworker_get_nodes_answer(cls, data):
    cls.domain.SIO.sio.emit("genworker_get_nodes_answer", data)
