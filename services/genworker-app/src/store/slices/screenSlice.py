import tkinter as tk
from tkinter import ttk

class screenSlice(dict):
  def __init__(self):
    self._screens: list[tk.Frame] = {}
    self.current: tk.Frame|None = None
    
    self.root = tk.Tk()
    self.root.title("GenWorker")
    
  def register_screen(self, screenName, screen):
    self._screens[screenName] = screen()
      
  def __getitem__(self, key):
    return self._screens[key]
  
  def show(self, screenName):
    if self.current: self.current.screen.grid_forget()
    self.current = self[screenName]
    self.current.screen.grid(column=0, row=0)
    