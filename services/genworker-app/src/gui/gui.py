import asyncio
import tkinter as tk
from tkinter import ttk

from gui.screens.LoginScreen import LoginScreen

from store.store import store as s

def render_gui():  
  s.screens.register_screen("login", LoginScreen)
  s.screens.show("login")
  