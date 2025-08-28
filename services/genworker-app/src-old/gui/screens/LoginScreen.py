import tkinter as tk
from tkinter import ttk
from store.store import store as s

class LoginScreen():
  def __init__(self):
    self.screen = ttk.Frame()
    sc = self.screen
    
    loginInput = ttk.Frame(sc)
    loginInput.grid(row=0, column=0)
    ttk.Label(loginInput, text="Email").grid()
    self.screen.loginEntry = ttk.Entry(loginInput); self.screen.loginEntry.grid(row=0, column=1)
    
    passwordInput = ttk.Frame(sc)
    passwordInput.grid(row=1, column=0)
    ttk.Label(passwordInput, text="Password").grid()
    self.screen.passwordEntry = ttk.Entry(passwordInput); self.screen.passwordEntry.grid(row=0, column=1)
    
    btn = ttk.Button(sc, text="Login"); btn.grid()
    # self.lbl = ttk.Label(self.screen, text="Status: idle"); self.lbl.grid(padx=8, pady=8)
    # btn = ttk.Button(self.screen, text="Start 5 kroków"); btn.grid(padx=8, pady=8)
    
    btn.config(command=lambda: s.auth.login(self.screen.loginEntry.get(), self.screen.passwordEntry.get()))