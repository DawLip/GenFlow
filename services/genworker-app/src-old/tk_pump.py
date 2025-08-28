import asyncio
import tkinter as tk

from store.store import store as s

async def tk_pump(fps=30):
  delay = 1 / fps
  while True:
    try: s.screens.root.update()
    except tk.TclError: break  
    await asyncio.sleep(delay)