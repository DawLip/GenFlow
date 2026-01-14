class LogParser:
    print_handler = None
    
    def __init__(self):
        pass
    
    def print(self, msg):
        return msg
    
    def log(self, source: str, event: str, msg: str):
        self.print_handler(f"[purple bold][{source}][/purple bold] [bold green]{event}[/bold green] {msg}")
    
    def warn(self, source: str, event: str, msg: str):
        self.print_handler(f"[purple bold][{source}][/purple bold] [bold yellow]{event}[/bold yellow] {msg}")
    
    def error(self, source: str, event: str, msg: str):
        self.print_handler(f"[purple bold][{source}][/purple bold] [bold red]{event}[/bold red] {msg}")