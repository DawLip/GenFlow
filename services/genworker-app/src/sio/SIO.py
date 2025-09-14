import socketio
import threading
from WebRTC.WebRTC import WebRTC
import asyncio

class SIO:
  sio = socketio.AsyncClient()
  task_scheduler = None
  file_system = None
  packages = None

  @classmethod
  def _bind_handlers(cls):
    @cls.sio.event
    async def connect():
      print("[SIO] Połączono z serwerem")

    @cls.sio.event
    async def disconnect():
      print("[SIO] Rozłączono z serwerem")

    @cls.sio.on("pong")
    async def on_pong(data):
      print(f"[SIO] Odebrano PONG: {data}")
      
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
      print("on_genworker_get_nodes: ", data)
      await cls.packages.get_nodes(data)
      
    @cls.sio.on("get_signal")
    async def on_get_signal(data):
      print("on_get_signal: ", data)
      await cls.webrtc.handle_get_signal(data)

    @cls.sio.on("signal")
    async def on_signal(data):
      print("on_signal: ", data)
      await cls.webrtc.handle_signal(data)

  @classmethod
  def worker(cls, token, worker_name):
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
      await cls.sio.wait()
    asyncio.run(async_sio())

  @classmethod
  def init(cls, domain, token, worker_name):
    threading.Thread(target=cls.worker, args=(token, worker_name), daemon=True).start()
    cls.task_scheduler = domain.task_scheduler
    cls.file_system = domain.file_system
    cls.packages = domain.packages
    domain.sio = cls
    domain.webrtc = WebRTC.init(domain, token, worker_name)
    cls.webrtc = domain.webrtc
    
    return cls
