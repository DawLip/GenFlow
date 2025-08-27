import asyncio
import tkinter as tk

async def tk_pump(root: tk.Tk, fps=30):
  delay = 1 / fps
  while True:
    try: root.update()
    except tk.TclError: break  
    await asyncio.sleep(delay)