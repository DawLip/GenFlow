import importlib
import json
import sys

class NodeRepo:

  def __init__(self, domain):
    self.workspace_dir = "services/genworker-app/workspace"
    self._nodes = {}
    
    self.app = domain.app
    self.domain = domain
  
  def build(self):
    pass
  
  def get(self, node_path):
    if node_path in self._nodes:
      return self._nodes[node_path]
    else:
      self.domain.console.error("NodeRepo", f"Node '{node_path}' does not exist")
      return None
  
  def register(self, node_path):
    path = f"{self.workspace_dir}/packages/{node_path}/{node_path.split('/')[-1]}.py"
    spec = importlib.util.spec_from_file_location("Node", path)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
      
    self._nodes[node_path] = m.Node()

  def get_node_path(self, node):
    return f"{node['package']}/{node['path']}/{node['data']['name']}"

    
  
