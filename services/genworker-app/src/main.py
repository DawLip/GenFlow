import sys

from ProgramBuilder import ProgramBuilder

sys.dont_write_bytecode = True

from transformers import logging as tlog
tlog.set_verbosity_error()  

from diffusers.utils import logging as dlog
dlog.set_verbosity_error()   
dlog.disable_progress_bar()

import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

# import faulthandler
# faulthandler.enable()
# faulthandler.dump_traceback_later(30, repeat=True)

if __name__ == "__main__":
    app_builder = ProgramBuilder()
    app_builder.init()
    app_builder.build()