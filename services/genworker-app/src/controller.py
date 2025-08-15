def controller(sio):
  @sio.event
  async def connect():
    print('[SIO] connected', sio.sid)

  @sio.event
  async def disconnect():
    print('[SIO] disconnected')

  @sio.on('genworker_task')
  async def process_task(data):
    print('task:', data)