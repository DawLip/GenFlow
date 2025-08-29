from ui.console.consoleUI import consoleUI

class UI:
  ui: consoleUI = None
  @classmethod
  def init(cls, ui_mode):
    if ui_mode=="console":
      cls.ui = consoleUI.init()
    else: 
      print("wrong ui_mode")