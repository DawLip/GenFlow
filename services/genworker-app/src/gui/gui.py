import asyncio
import tkinter as tk
from tkinter import ttk

from store.store import store as s

def render_gui():
  ui_in = s.io_queue.ui_in
  ui_out = s.io_queue.ui_out
  
  ui = s.ui
  
  root = tk.Tk(); root.title("GenWorker")
  
  ui["root"] = root
  ui["lbl"] = ttk.Label(root, text="Status: idle"); ui["lbl"].pack(padx=8, pady=8)
  btn = ttk.Button(root, text="Start 5 kroków"); btn.pack(padx=8, pady=8)
  
  btn.config(command=lambda: ui_in.put_nowait(("start", 5)))
  root.protocol("WM_DELETE_WINDOW", lambda: ui_in.put_nowait(("quit",)))
  
  return root