import shutil
from rich import print
import time
import sys
import os
import threading
import select, termios, tty
from queue import Queue


class ConsoleManager:
	def __init__(self, log_parser):  
		self.messages = Queue()
		self.input_buffer = ""
		self.shell_prompt = "cmd: "
		self.shell_function = self.default_shell
		self.render_UI = self.render_UI_default
  
		self.console = log_parser
		self.console.print_handler = self.log

		# threading.Thread(target=self.fake_data, daemon=True).start() # fake data for testing
		threading.Thread(target=self.renderer, daemon=True).start()
		threading.Thread(target=self.input_listener, daemon=True).start()
  
		self.render("###RERENDER###")

	def input_listener(self):
		loop = True
		while loop:
			cmd_chr = self.get_char()
			if cmd_chr == 'q':
				self.input_buffer = ""
				loop = False
				self.log("###STOP###")
			elif cmd_chr == '\r':
				self.shell_function(self.input_buffer)
				self.input_buffer = ""
			elif cmd_chr in ("\x7f", "\b"):
				self.input_buffer = self.input_buffer[:-1]
				self.log("###RERENDER###")
			else:
				self.input_buffer += cmd_chr
				self.log("###RERENDER###")
			

	def fake_data(self):
		for i in range(999999):
			self.messages.put(f"[bold green]Progress:[/bold green] {i}/999999")
			time.sleep(1)

	def log(self, msg):
		self.messages.put(msg)
       
	def renderer(self):
		rerender_loop = True
		while rerender_loop:
			msg = self.messages.get()
   
			if msg == "###RERENDER###":
				self.render("###RERENDER###")
			elif msg == "###STOP###":
				rerender_loop = False
				print("\nExiting console...")
			else:
				self.render(msg)
    
	def render(self, msg):
		UI = self.render_UI()
		self.remove_last_lines(len(UI) + 1)
  
		if msg != "###RERENDER###":
			print(msg)

		for line in UI:
			sys.stdout.write("\r\x1b[2K")
			print(line)
  
		sys.stdout.write("\r\x1b[2K")
		print(f"{self.shell_prompt}{self.input_buffer}", end='', flush=True)
  
	def render_UI_default(self):
		return ["="*self.cols()]
  
	def remove_last_lines(self, n: int=1):
		sys.stdout.write('\r')
		sys.stdout.write('\x1b[2K')
		if n > 1:
			for _ in range(n-1):
				sys.stdout.write('\x1b[1A')
				sys.stdout.write('\r')
				sys.stdout.write('\x1b[2K')
		sys.stdout.flush()
  
	def default_shell(self, cmd):
		self.log(f"[bold blue]Command entered:[/bold blue] {cmd}")
  
	def get_char(self):
		fd = sys.stdin.fileno()
		old = termios.tcgetattr(fd)
		try:
			tty.setraw(fd)         
			return sys.stdin.read(1)
		finally:
			termios.tcsetattr(fd, termios.TCSADRAIN, old)
   
	def cols(self):
		cols, rows = shutil.get_terminal_size()
		return cols

	def rows(self):
		cols, rows = shutil.get_terminal_size()
		return rows