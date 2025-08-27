import asyncio

from gui.gui import render_gui

from tk_pump import tk_pump
from worker import worker
from ui_reader import ui_reader
from sio import socket

async def main():
  root = render_gui()
  
  await asyncio.gather(
    tk_pump(root),
    worker(),
    ui_reader(),
    socket()
  )
  
if __name__ == "__main__":
    asyncio.run(main())