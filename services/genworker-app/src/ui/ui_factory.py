from ui.console.consoleUI import consoleUI

def ui_factory(ui_mode):
  if ui_mode=="console":
    return consoleUI