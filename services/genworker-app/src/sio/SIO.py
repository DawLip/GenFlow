import socketio
import threading

class SIO:
  sio = socketio.Client()
  task_scheduler = None
  file_system = None

  @classmethod
  def _bind_handlers(cls):
    @cls.sio.event
    def connect():
      print("[SIO] Połączono z serwerem")

    @cls.sio.event
    def disconnect():
      print("[SIO] Rozłączono z serwerem")

    @cls.sio.on("pong")
    def on_pong(data):
      print(f"[SIO] Odebrano PONG: {data}")
      
    @cls.sio.on("task_assigned")
    def on_task_assigned(task_id):
      cls.task_scheduler.new_task(task_id)
      
    @cls.sio.on("file_save")
    def on_file_save(file):
      cls.file_system.save_file(file["full_path"], file["content"])

    @cls.sio.on("file_get")
    def on_file_get(file):
      cls.file_system.get_file(file["full_path"])

  @classmethod
  def worker(cls, token, worker_name):
    cls._bind_handlers()
    cls.sio.connect(
      "http://localhost:3000", 
      socketio_path="/socket.io", 
      transports=["websocket"],
      auth={
        "token": token,
        "isWorker": True,
        "workerName": worker_name
      }
    )
    cls.sio.wait() 
    
  @classmethod
  def init(cls, domain, token, worker_name):
    threading.Thread(target=cls.worker, args=(token, worker_name), daemon=True).start()
    cls.task_scheduler = domain.task_scheduler
    cls.file_system = domain.file_system
