from .slices.screenSlice import ScreenSlice
from .slices.ioQueueSlice import IOQueueSlice
from .slices.authSlice import AuthSlice

class store:
  io_queue = None
  ui = {}
  screens = None
  auth = None
  
  def init():
    store.io_queue = IOQueueSlice()
    store.ui = {}
    store.screens = ScreenSlice()
    store.auth = AuthSlice(store)
