import sys
from fastapi import FastAPI
from queue import Queue
from rich import print

from domain.Domain import Domain

from sio.SIO import SIO
from ui.UI import UI

from dispatch import dispatch

from event_queue import q

# import faulthandler
# faulthandler.enable()
# faulthandler.dump_traceback_later(30, repeat=True)
is_app_running = True
try:
  UI.init("console")
  Domain.init()
  
  while is_app_running:
    event, payload = q.get()
    
    handler = dispatch.get(event)
    if handler: handler(payload)
    else: print("Unknown event:", event)
except (KeyboardInterrupt, SystemExit):
  sys.stdout.write("\r\x1b[2K")
  print("[bold yellow]KeyboardInterrupt or SystemExit[/bold yellow]")

sys.stdout.write("\r\x1b[2K")
print("[bold green]GenWorker closed[/bold green]\n")