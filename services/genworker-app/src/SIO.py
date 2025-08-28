import socketio
import threading

class SIO:
  sio = socketio.Client()
  
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

  @classmethod
  def worker(cls, token):
    cls._bind_handlers()
    cls.sio.connect(
      "http://localhost:3000", 
      socketio_path="/socket.io", 
      transports=["websocket"],
      auth={"token": token}
    )
    cls.sio.wait() 
    
  @classmethod
  def init(cls, token):
    threading.Thread(target=cls.worker, args=(token,), daemon=True).start()
