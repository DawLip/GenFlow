from __future__ import annotations
from typing import TYPE_CHECKING, Protocol, Any
if TYPE_CHECKING:
    from App import AppProtocol

from ui.console.consoleUI import consoleUI


class UIProtocol(Protocol):
  app: AppProtocol

  ui: consoleUI
  domain: Any
  console: Any

  def init(self): ...

class UI:
  def __init__(self, app: AppProtocol):
    self.app = app
  
  def init(self, ui_mode):
    self.domain = self.app.domain
    
    if ui_mode=="console":
      self.ui = consoleUI(self.app)
      self.ui.init()
      self.console = self.ui.console
    else: 
      print("wrong ui_mode")
    