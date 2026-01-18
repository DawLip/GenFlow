import importlib.util
import json

class CpuWorker:
  domain = None
  task_repo = None
  node_repo = None

  def __init__(self, domain):
    self.domain = domain
    self.task_repo = domain.task_repo
    self.node_repo = domain.node_repo
    
    self.domain.console.log("CpuWorker", f"Registring Nodes...") 

    nodes_list = domain.packages.get_nodes_list()
    for node_index, node_path in enumerate(nodes_list):
      self.node_repo.register(node_path)
      node_display = f"{node_path.split("/")[0]}/.../{node_path.split("/")[-1]}"
      self.domain.console.debug("CpuWorker", "Node registered:", node_display)
    self.domain.console.log("CpuWorker", f"All Nodes registred") 

  def execute_node(self, node, outcoming_ports, incoming_ports):
    # node_to_execute = self.node_registry[f"{node['packet']}/{node['path']}/{node['data']['name']}"]
    self.domain.Node.execute(node, outcoming_ports, incoming_ports)


