import threading

class Thread:
    app = None

    def __init__(self, app, worker, name, id, args=()):
        self.app = app
        self.id = id
        self.name = name
        self.stop_event = threading.Event()
        self.worker = worker

        self.thread = threading.Thread(
            target=self.worker_wrapper, 
            daemon=True, 
            args = (self.stop_event, *args)
        )
        self.thread.start()
    
    def worker_wrapper(self, *args):
        try:
            self.worker(*args)
        except Exception as exp:
            self.app.print_fatal_error(exp)

    def stop(self):
        self.stop_event.set()

class Threading:
    app = None
    threads = []
    next_id = 0
    def __init__(self, app) -> None:
        self.app = app

    def create_thread(self, worker, name = None, args = ()):
        if not name: name = len(self.threads) + 1

        new_thread = Thread(self.app, worker, name, self.next_id, args = args)
        self.threads.append(new_thread)
        self.next_id += 1

    def stop_all_threads(self):
        for t in self.threads:
            t.stop()
    
    def show_raport(self):
        for t in self.threads:
            if t.thread.is_alive(): self.app.console.log("Threading", f"Thread {t.id} status - {t.name}:", "[green]OK[/green]" )
            else: self.app.console.error("Threading", f"Thread {t.id} status - {t.name}:", "[red]DEAD[/red]")