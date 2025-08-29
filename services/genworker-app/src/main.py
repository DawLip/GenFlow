import threading
from queue import Queue

from domain.Domain import Domain

from sio.SIO import SIO
from ui.UI import UI

from dispatch import dispatch

from event_queue import q

UI.init("console")
Domain.init()

while True:
  event, payload = q.get()
  
  handler = dispatch.get(event)
  if handler: handler(payload)
  else: print("Unknown event:", event)
  