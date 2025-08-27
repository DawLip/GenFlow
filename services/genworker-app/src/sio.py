import os
import asyncio
import socketio
from store.store import store as s

sio = socketio.AsyncClient(reconnection=True, reconnection_attempts=0)

async def _setup_socketio_handlers():
  ui_out = s.io_queue.ui_out

  @sio.event
  async def connect():
    await ui_out.put(("status", f"Połączono"))

  @sio.event
  async def connect_error(data):
    await ui_out.put(("status", f"Błąd połączenia: {data}"))

  @sio.event
  async def disconnect():
    await ui_out.put(("status", "Rozłączono"))

  @sio.on("status")
  async def on_status(msg):
      await ui_out.put(("status", str(msg)))

  await sio.connect(
    "http://localhost:3000", 
    socketio_path="/socket.io", 
    transports=["websocket"],
    auth={"token": s.auth["token"]})

async def socket():
  if not sio.connected:
    try:
      await _setup_socketio_handlers()
    except Exception as e:
      print(f"Socket.IO connect error: {e!s}")
