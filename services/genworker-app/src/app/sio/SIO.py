import socketio
import threading
from app.WebRTC.WebRTC import WebRTC
import asyncio

class SIO:
  task_scheduler = None
  file_system = None
  packages = None
  is_connected = None

  def __init__(self, domain):
    self.domain = domain

  def init(self, token, worker_name):
    self.console = self.domain.console
    # self.task_scheduler = self.domain.task_scheduler
    self.file_system = self.domain.file_system
    # self.packages = self.domain.packages
    self.webrtc = self.domain.webrtc
    self.domain.sio = self

    self.domain.app.process.threading.create_thread(self.worker, "SIO", args=(token, worker_name))
    
    return self
  
  def build(self):
    pass


  def _bind_handlers(self):
    @self.sio.event
    async def connect():
      self.is_connected = True
      self.domain.ui.console.log("SIO", "Socket.io connected")

    @self.sio.event
    async def disconnect():
      self.is_connected = False
      self.domain.ui.console.error("SIO", "Socket.io disconnected", "")

    @self.sio.on("pong")
    async def on_pong(data):
      self.console.log("SIO", f"Odebrano PONG:", data)
      
    # @self.sio.on("task_assigned")
    # async def on_task_assigned(task_id):
    #   self.task_scheduler.new_task(task_id)
      
    # @self.sio.on("file_save")
    # async def on_file_save(file):
    #   self.file_system.save_file(file["full_path"], file["content"])

    # @self.sio.on("file_get")
    # async def on_file_get(file):
    #   self.file_system.get_file(file["full_path"])

    # @self.sio.on("genworker_get_nodes")
    # async def on_genworker_get_nodes(data):
    #   # self.console.log("SIO", "on_genworker_get_nodes:", data, json=True)
    #   await self.packages.get_nodes(data)
      
    @self.sio.on("get_signal")
    async def on_get_signal(data):
      # self.console.log("SIO", "on_get_signal:", data, json=True)
      await self.webrtc.handle_get_signal(data)

    @self.sio.on("signal")
    async def on_signal(data):
      # self.console.log("SIO", "on_signal: ", data, json=True)
      await self.webrtc.handle_signal(data)

  def worker(self, stop_event, token, worker_name):
    self.sio = socketio.AsyncClient()
    
    async def async_sio():
      self.loop = asyncio.get_running_loop()
      self._bind_handlers()
      await self.sio.connect(
        "http://localhost:3000",
        socketio_path="/socket.io",
        transports=["websocket"],
        auth={
            "token": token,
            "isWorker": True,
            "workerName": worker_name
        }
      )
      self.domain.webrtc.init(token, worker_name)

      try:
        while not stop_event.is_set():
          await asyncio.sleep(0.1)
      finally:
        if self.sio.connected:
          await self.sio.disconnect()

    asyncio.run(async_sio())
    


