import getpass
from event_queue import domain_queue
from rich.align import Align
from domain import Domain

class DashboardScreen:
  def __init__(self, ConsoleUI):
    self.ConsoleUI = ConsoleUI
    self.UIM = ConsoleUI.UIM
    self.console = self.UIM.console

  def init(self):
    self.UIM.shell_prompt = "[bold white]cmd: [/bold white]"
    self.UIM.shell_function = self.cmd_handler
    self.UIM.render_UI = self.render_UI

  def render(self):
    self.console.soft_rerender()

  def render_UI(self):
    cols = self.UIM.cols()
    rows = self.UIM.rows()

    domain = self.ConsoleUI.domain

    users_connected = len(domain.webrtc.userPeersList) if domain.webrtc else 0
    genworkers_connected = len(domain.webrtc.genworkerPeersList) if domain.webrtc else 0

    return [
      "="*cols,
			Align.center("Dashboard", width=cols),
      "="*cols,
      "",
      f" GenWorker: [purple]{domain.authRepo.email}[/purple]:{domain.authRepo.worker_name}",
      f" Socket.io: {'[green]connected[/green]' if domain.sio.is_connected else '[red]disconnected[/red]'}",
      f" WebRTC users connected: {users_connected}",
      f" WebRTC genworkers connected: {genworkers_connected}",
      "",
      "="*cols,
    ]


  def cmd_handler(self, cmd):
    self.console.log("Dashboard", "Command:", cmd)