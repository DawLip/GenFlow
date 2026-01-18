import sys
from rich import print
import traceback
import linecache
import shutil

from domain.Domain import Domain

from dispatch import dispatch
from event_queue import domain_queue

from ui.UI import UI
from ui.LogLevel import LogLevel
from Threading import Threading

class App:
    domain = None
    ui = None
    console = None

    is_running = True
    log_level = LogLevel.DEBUG

    def __init__(self):
        self.threading = Threading(self)
        self.ui = UI(self)
        self.domain = Domain(self)
        
    def start(self):
        try:
            self.ui.init("console")
            self.console = self.ui.console
            self.domain.init()
            
            while self.is_running:
                event, payload = domain_queue.get()
                
                handler = dispatch.get(event)
                if handler: handler(payload)
                else: print("Unknown event:", event)
        except Exception as exc:
            self.print_fatal_error(exc)

    def print_fatal_error(self, exc):
        cols, rows = shutil.get_terminal_size()
        err_msg = ""

        R = "\033[0m"
        BOLD = "\033[1m"
        RED     = "\033[31m"
        YELLOW  = "\033[33m"
        BLUE    = "\033[34m"
        PURPLE = "\033[38;2;180;0;255m"

        out = sys.stderr

        err_msg += RED + "=" * cols + f"{R}\n\n\r\x1b[2K"
        err_msg += " "*(cols//2-4)+ f"{PURPLE}{BOLD}GenWorker{R}" + " "*(cols//2-4) + "\n\r\x1b[2K"
        err_msg += " "*(cols//2-5)+ f"{RED}{BOLD}FATAL ERROR{R}" + " "*(cols//2-5) + "\n\r\x1b[2K"
        err_msg += RED + "=" * cols + f"{R}\n\n\r\x1b[2K"

        tb = exc.__traceback__
        frames = traceback.extract_tb(tb) if tb else []

        out.write("Traceback (most recent call last):\n\n\r\x1b[2K")
        for fr_index, fr in enumerate(frames):
            path = fr.filename.split("/src", 1)[-1]
            prev_lines = 6 if fr_index+1 == len(frames) else 2
            past_lines = 3 if fr_index+1 == len(frames) else 1

            code = []
            for i in range(fr.lineno-prev_lines, fr.lineno+past_lines):
                marker = ">>> " if i == fr.lineno else "    "
                color = RED if i == fr.lineno else YELLOW
                code_line = linecache.getline(fr.filename, i).rstrip("\n").strip()
                full_line = f"{marker}{i}: {color}{code_line}{R}"
                code.append(full_line + "\n\r\x1b[2K")

            err_msg += f'F: "{BOLD}{path}{R}"\n\r\x1b[2KLine {RED}{BOLD}{fr.lineno}{R}, in "{BLUE}{BOLD}{fr.name}{R}":\n\r\x1b[2K'
            for line in code:
                err_msg += line

            err_msg += f"\n\r\x1b[2K"

        exc_type = type(exc).__name__
        err_msg += f"{BOLD}{RED}{exc_type}: {exc}{R}\n\n\r\x1b[2K"

        err_msg += RED + "=" * cols + f"{R}\n" + "\n"*10 + "\r\x1b[2K"
        out.write("\n\r\x1b[2K\n" + err_msg)
        out.flush()


    def exit(self):
        self.is_running = False
        self.threading.stop_all_threads()
        domain_queue.put(('EXIT', {}))