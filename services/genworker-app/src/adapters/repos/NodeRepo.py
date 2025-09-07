import importlib
import json


class NodeRepo:
  workspace_dir = "services/genworker-app/workspace"
  _nodes = {}

  def __init__(self, domain):
    self.domain = domain
  
  def get(self, node_path):
    return self._nodes[node_path]
  
  def register(self, node_path):
    path = f"{self.workspace_dir}/packages/{node_path}/{node_path.split('/')[-1]}.py"
    spec = importlib.util.spec_from_file_location("Node", path)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
      
    self._nodes[node_path] = m.Node()

    print(f"\nNode registered: {node_path}")

  def get_node_path(self, node):
    return f"{node['packet']}/{node['path']}/{node['data']['name']}"

    
  
