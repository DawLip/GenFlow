import json
from typing import Protocol, Any

from ..LogLevel import LogLevel

class LogParserProtocol(Protocol):
    print_handler: Any

    def print(self, msg): ...
    def rerender(self): ...
    def soft_rerender(self): ...
    def debug(self, source: str, event: str, msg: str, json:bool): ...
    def trace(self, source: str, event: str, msg: str, json:bool): ...
    def log(self, source: str, event: str, msg: str, json:bool): ...
    def warn(self, source: str, event: str, msg: str, json:bool): ...
    def error(self, source: str, event: str, msg: str , json:bool): ...

class LogParser:
    print_handler = None
    
    def __init__(self, app):
        self.app = app
    
    def print(self, msg):
        return self.print_handler(msg)
        
    def rerender(self):
        return self.print_handler("###RERENDER###")

    def soft_rerender(self):
        return self.print_handler("###SOFT_RERENDER###")

    def debug(self, source: str, event: str, msg: str = "", json:bool=False):
        if self.app.log_level <= LogLevel.DEBUG:
            return self.print_handler(f"[purple bold][{source}][/purple bold] [white]{event}[/white] {self.format_json(msg, json)}")

    def trace(self, source: str, event: str, msg: str = "", json:bool=False):
        if self.app.log_level <= LogLevel.TRACE:
            return self.print_handler(f"[purple bold][{source}][/purple bold] [bold white]{event}[/bold white] {self.format_json(msg, json)}")

    def log(self, source: str, event: str, msg: str = "", json:bool=False):
        if self.app.log_level <= LogLevel.INFO:
            return self.print_handler(f"[purple bold][{source}][/purple bold] [bold green]{event}[/bold green] {self.format_json(msg, json)}")
    
    def warn(self, source: str, event: str, msg: str = "", json:bool=False):
        if self.app.log_level <= LogLevel.WARNING:
            return self.print_handler(f"[purple bold][{source}][/purple bold] [bold yellow]{event}[/bold yellow] {self.format_json(msg, json)}")
    
    def error(self, source: str, event: str, msg: str = "", json:bool=False):
        return self.print_handler(f"[purple bold][{source}][/purple bold] [bold red]{event}[/bold red] {self.format_json(msg, json)}")

    def format_json(self, msg, is_json):
        if is_json:
            return json.dumps(msg, indent=4, ensure_ascii=False)
        else:
            return msg
