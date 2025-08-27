import asyncio

class ioQueueSlice:
  def __init__(self):
    self.ui_in = asyncio.Queue()
    self.ui_out = asyncio.Queue()