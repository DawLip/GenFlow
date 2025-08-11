import asyncio
import socketio
import requests

sio = socketio.AsyncClient(
  reconnection=True,
  reconnection_attempts=0,
  reconnection_delay=1,
  reconnection_delay_max=5
)

@sio.event
async def connect():
  print('[SIO] connected', sio.sid)

@sio.event
async def disconnect():
  print('[SIO] disconnected')

@sio.on('genworker_task')
async def process_task(data):
  print('task:', data)
  
data = {
  'accessToken': ''
}  
  
async def login(email, password):
  payload = {
    'email': email,
    'password': password
  }
  response = requests.post('http://localhost:3000/api/auth/login', json=payload).json()
  
  data['accessToken'] = response['accessToken']
  data['userId'] = response['userId']
  
  return response['accessToken']

async def main():
  await login('1', '1')

  await sio.connect(
    'http://localhost:3000',
    headers={'Authorization': f'Bearer {data['accessToken']}'},
    auth={'token': data['accessToken']},
    namespaces=['/'],
    transports=['websocket'],
    socketio_path='/socket.io'
  )

  await sio.emit('genworker_register', {'name': 'my-worker', 'userId': data['userId']})
  # await sio.emit('genworker_assign', {'name': 'my-worker'})

  await sio.wait()

asyncio.run(main())
