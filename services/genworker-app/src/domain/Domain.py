from __future__ import annotations
from typing import TYPE_CHECKING, Protocol, Any
if TYPE_CHECKING:
	from app.App import AppProtocol

class DomainProtocol(Protocol):
  app: AppProtocol

  task_scheduler = None
  task_repo = None
  node_repo = None
  file_repo = None
  authRepo = None

  Node = None

  file_system = None
  packages = None
  auth = None
  cpu_worker = None
  projects = None

  sio = None
  webrtc = None

class ModuleProtocol(Protocol):
  def init(domain): ...
  def build(): ...

class Domain:
  def __init__(self, app) -> None:
    self.app = app
    self.modules_list: [str] = []
    self.modules: dict[str, ModuleProtocol] = {}

  def init(self, modules={}):
    for module_name, module_cls in modules.items():
      self.modules_list.append(module_name)
      self.modules[module_name] = module_cls
      
      setattr(self, module_name, self.modules[module_name])


  def build(self):
    for module in self.modules.values():
      module.build()

  def init_modules(self):
    for module in self.modules.values():
      if hasattr(module, "init_module"):
        module.init_module()
