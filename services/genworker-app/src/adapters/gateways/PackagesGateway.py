import requests

class PackagesGateway:
  def __init__(self, domain):
    self.domain = domain
  
  def build(self):
    pass

  async def genworker_get_nodes_answer(self, data):
    await self.SIO.sio.emit("genworker_get_nodes_answer", data)
