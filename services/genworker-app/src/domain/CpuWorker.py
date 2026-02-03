import importlib.util
import json

class CpuWorker:
  domain = None
  task_repo = None
  node_repo = None

  def __init__(self, domain):
    self.domain = domain
  
  def build(self):
    self.task_repo = self.domain.task_repo
    self.node_repo = self.domain.node_repo
  
  def init_module(self):
    self.domain.console.log("CpuWorker", f"Registring Nodes...") 

    last_package = ""
    nodes_list = self.domain.packages.get_nodes_list()
    for node_index, node_path in enumerate(nodes_list):
      package_name = node_path.split("/")[0]
      path = node_path.split("/")[1:-1]
      node_name = node_path.split("/")[-1]

      if package_name != last_package: 
        self.domain.console.trace("CpuWorker", "Registring package:", package_name)

      self.node_repo.register(node_path)
      self.domain.console.debug("CpuWorker", "Node registered:", node_name)
      last_package = package_name
      
    self.domain.console.log("CpuWorker", f"All Nodes registred") 

  def execute_node(self, node, outcoming_ports, incoming_ports):
    # node_to_execute = self.node_registry[f"{node['packet']}/{node['path']}/{node['data']['name']}"]
    self.domain.Node.execute(node, outcoming_ports, incoming_ports)


