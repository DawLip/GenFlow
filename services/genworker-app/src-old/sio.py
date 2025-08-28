
  
  import os
import asyncio
import socketio
from store.store import store as s

sio = socketio.AsyncClient(reconnection=True, reconnection_attempts=0)

async def _setup_socketio_handlers():
  @sio.event
  async def connect():
    # s.io_queue.ui_out.put_nowait(("status", f"Połączono"))
    print('connect')

  @sio.event
  async def connect_error(data):
    # s.io_queue.ui_out.put_nowait(("status", f"Błąd połączenia: {data}"))
    print('connect_error: ', data)

  @sio.event
  async def disconnect():
    # s.io_queue.ui_out.put_nowait(("status", "Rozłączono"))
    print('disconnect')

  @sio.on("status")
  async def on_status(msg):
    # s.io_queue.ui_out.put_nowait(("status", str(msg)))
    print('status')
  
async def _connect(token):
  print("_connect")
  try:
    await sio.connect(
      "http://localhost:3000", 
      socketio_path="/socket.io", 
      transports=["websocket"],
      auth={"token": token}
    )
    print("connected")
  except Exception as e:
    print(f"Socket.IO connect error: {e!s}")

async def socket():
  await _setup_socketio_handlers()
  
  while True:
    cmd, payload = await s.io_queue.ui_in.get()
    if cmd == "login_success":
      print("socket")
      await _connect(payload["token"])

