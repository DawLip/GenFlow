import socketio
import threading
from WebRTC.WebRTC import WebRTC
import asyncio

class SIO:
  sio = socketio.AsyncClient()
  task_scheduler = None
  file_system = None
  packages = None
  is_connected = None

  @classmethod
  def _bind_handlers(cls):
    @cls.sio.event
    async def connect():
      cls.is_connected = True
      cls.domain.ui.console.log("SIO", "Socket.io connected")

    @cls.sio.event
    async def disconnect():
      cls.is_connected = False
      cls.domain.ui.console.error("SIO", "Socket.io disconnected", "")

    @cls.sio.on("pong")
    async def on_pong(data):
      cls.console.log("SIO", f"Odebrano PONG:", data)
      
    @cls.sio.on("task_assigned")
    async def on_task_assigned(task_id):
      cls.task_scheduler.new_task(task_id)
      
    @cls.sio.on("file_save")
    async def on_file_save(file):
      cls.file_system.save_file(file["full_path"], file["content"])

    @cls.sio.on("file_get")
    async def on_file_get(file):
      cls.file_system.get_file(file["full_path"])

    @cls.sio.on("genworker_get_nodes")
    async def on_genworker_get_nodes(data):
      # cls.console.log("SIO", "on_genworker_get_nodes:", data, json=True)
      await cls.packages.get_nodes(data)
      
    @cls.sio.on("get_signal")
    async def on_get_signal(data):
      # cls.console.log("SIO", "on_get_signal:", data, json=True)
      await cls.webrtc.handle_get_signal(data)

    @cls.sio.on("signal")
    async def on_signal(data):
      # cls.console.log("SIO", "on_signal: ", data, json=True)
      await cls.webrtc.handle_signal(data)

  @classmethod
  def worker(cls, stop_event, token, worker_name):
    async def async_sio():
      cls._bind_handlers()
      await cls.sio.connect(
        "http://localhost:3000",
        socketio_path="/socket.io",
        transports=["websocket"],
        auth={
            "token": token,
            "isWorker": True,
            "workerName": worker_name
        }
      )

      try:
        while not stop_event.is_set():
          await asyncio.sleep(0.1)
      finally:
        if cls.sio.connected:
          await cls.sio.disconnect()

    asyncio.run(async_sio())
    

  @classmethod
  def init(cls, domain, token, worker_name):
    cls.domain = domain
    cls.console = cls.domain.console
    cls.task_scheduler = domain.task_scheduler
    cls.file_system = domain.file_system
    cls.packages = domain.packages
    domain.sio = cls
    domain.webrtc = WebRTC.init(domain, token, worker_name)
    cls.webrtc = domain.webrtc

    cls.domain.app.threading.create_thread(cls.worker, "SIO", args=(token, worker_name))
    
    return cls
