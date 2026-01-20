import sys

from App import AppBuilder

sys.dont_write_bytecode = True

from transformers import logging as tlog
tlog.set_verbosity_error()  

from diffusers.utils import logging as dlog
dlog.set_verbosity_error()   
dlog.disable_progress_bar()


# import faulthandler
# faulthandler.enable()
# faulthandler.dump_traceback_later(30, repeat=True)

# app = App()
# app.build()
# app.start()
if __name__ == "__main__":
    app_builder = AppBuilder()
    app_builder.init()
    app_builder.build()