import asyncio

class Queue(asyncio.Queue):
  def __init__(self, loop: asyncio.AbstractEventLoop, maxsize: int = 0):
    super().__init__(maxsize=maxsize)
    self.loop = loop
    
  # def put(self, item):
  #   self.loop.call_soon_threadsafe(self.put_nowait, item)
  

class IOQueueSlice:
  def __init__(self):
    self.loop =  asyncio.get_running_loop()
    
    self.ui_in = asyncio.Queue()
    self.ui_out = asyncio.Queue()