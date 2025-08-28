import socketio

from store.store import Store

def sio_client():
  return socketio.AsyncClient(
    reconnection=True,
    reconnection_attempts=0,
    reconnection_delay=1,
    reconnection_delay_max=5
  )
  
def sio_connect(sio):
  sio.connect(
    'http://localhost:3000',
    headers={'Authorization': f'Bearer {Store().auth['accessToken']}'},
    auth={'token': Store().auth['accessToken']},
    namespaces=['/'],
    transports=['websocket'],
    socketio_path='/socket.io'
  )