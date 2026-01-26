from __future__ import annotations
from typing import TYPE_CHECKING, Protocol, Any
if TYPE_CHECKING:
	from LogParser import LogParserProtocol
	from App import AppProtocol

import shutil
from rich import print as rprint
from rich.markup import escape

import time
import sys
import termios, tty
from queue import Queue
from rich.align import Align
from rich.errors import MarkupError
import os
    

class ConsoleManagerProtocol:
	app: AppProtocol
	messages: Queue
	input_buffer: str 
	shell_prompt: str 
	previous_ui: [str] 
	previous_message_lines: int 
	shell_function: Any
	render_UI: Any
	console: LogParserProtocol

class ConsoleManager(ConsoleManagerProtocol):
	def __init__(self, app: AppProtocol, log_parser: LogParserProtocol):  
		self.app = app
		self.messages = Queue()
		self.input_buffer = ""
		self.shell_prompt = "cmd: "
		self.previous_ui = [""]
		self.previous_message_lines = 0
		self.shell_function = self.default_shell
		self.render_UI = self.render_UI_default
  
		self.console = log_parser
		self.console.print_handler = self.log

		# threading.Thread(target=self.fake_data, daemon=True).start() # fake data for testing
		self.app.process.threading.create_thread(self.renderer, "Main_Renderer")
		self.app.process.threading.create_thread(self.input_listener, "Input_Lisner") 

		print("\n"*5)
		os.system("cls" if os.name == "nt" else "clear")

		self.render("###RERENDER###")

	def input_listener(self, stop_event):
		while not stop_event.is_set():
			cmd_chr = self.get_char()
			if cmd_chr == '\x1b':
				self.input_buffer = ""
				self.log("###STOP###")
			elif cmd_chr == '\r':
				self.shell_function(self.input_buffer)
				self.input_buffer = ""
				self.log("###RERENDER###")
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
       
	def renderer(self, stop_event):
		while not stop_event.is_set():
			try:
				msg = self.messages.get(timeout=0.1)
			except:
				continue
   
			if msg == "###RERENDER###":
				self.render("###RERENDER###")
			if msg == "###SOFT_RERENDER###":
				self.render("###SOFT_RERENDER###")
			elif msg == "###STOP###":
				sys.stdout.write("\r\x1b[2K")
				self.render("###EXIT###")
				self.app.exit()
			else:
				self.render(msg)
    
	def normalize_ui(self, ui):
		out = []
		for item in ui:
			if isinstance(item, str):
				out.append(item)
			elif isinstance(item, Align):
				out.append((
					"ALIGN",
					item.renderable,
					item.width,
					item.align,
				))
			else:
				out.append(repr(item))
		return out

	def render(self, msg: str):
		if msg == "###EXIT###": 
			self.shell_prompt = ""
			self.input_buffer = ""
			self.render_UI = self.render_UI_exit

		UI = self.render_UI()

		if self.normalize_ui(UI) == self.normalize_ui(self.previous_ui) and msg == "###SOFT_RERENDER###": return

		self.remove_last_lines(len(self.previous_ui)+1)
  
		if msg not in ("###RERENDER###", "###SOFT_RERENDER###", "###EXIT###"):
			for part in str(msg).splitlines() or [""]:
				sys.stdout.write("\r\x1b[2K")
				try:
					rprint(part, flush=False)
				except MarkupError:
					rprint(escape(part), flush=False)

		for line in UI:
			sys.stdout.write("\r\x1b[2K")
			try:
				rprint(line, flush=False)
			except MarkupError:
				rprint(escape(line), flush=False)

  
		sys.stdout.write("\r\x1b[2K")
		try:
			rprint(f"{self.shell_prompt}[white]{self.input_buffer}[/white]", end='', flush=True)
		except MarkupError:
			rprint(escape(f"{self.shell_prompt}{self.input_buffer}"), end='', flush=True)

		self.previous_ui = UI
  
	def render_UI_default(self):
		cols = self.cols()
		rows = self.rows()

		return [
			"="*cols,
		]
	def render_UI_exit(self):
		cols = self.cols()

		return [
			"="*cols,
			"",
			Align.center("[bold purple]GenWorker[/bold purple]", width=cols),
			"",
			Align.center("service stopped", width=cols),
			"",
			"="*cols,
		]
  
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