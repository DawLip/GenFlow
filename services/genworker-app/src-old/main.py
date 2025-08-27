import asyncio
import socketio

from controller import controller

from login import login

from store.store import Store
from config.sio_config import sio_client, sio_connect

sio = sio_client()

controller(sio)

async def main():
  s = Store()
  
  await login('1', '1')
  await sio_connect(sio)
  await sio.emit('genworker_register', {'name': 'my-worker', 'userId': s.auth['userId']})
  
  # await sio.emit('genworker_assign', {'name': 'my-worker'})

  await sio.wait()

asyncio.run(main())
