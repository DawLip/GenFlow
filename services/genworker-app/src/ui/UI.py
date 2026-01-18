from ui.console.consoleUI import consoleUI

class UI:
  ui: consoleUI = None
  console = None

  def __init__(self, app):
    self.app = app
  
  def init(self, ui_mode):
    self.domain = self.app.domain
    
    if ui_mode=="console":
      self.ui = consoleUI(self.app)
      self.ui.init()
      self.console = self.ui.console
    else: 
      print("wrong ui_mode")
    