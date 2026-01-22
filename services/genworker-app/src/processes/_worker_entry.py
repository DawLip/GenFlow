from .ExceptionHandler import ExceptionHandler

def _worker_entry(worker_cls, processes_name, worker_cls_args):
    exception_handler = ExceptionHandler()  

    try:
        worker = worker_cls(*worker_cls_args)
        worker.init()
        worker.build()
        worker.start()

    except Exception as exc:
        exception_handler.print_fatal_error(exc)