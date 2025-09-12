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
    
    print('\n')
    nodes_list = domain.packages.get_nodes_list()
    for node_path in nodes_list:
      self.node_repo.register(node_path)
      
  def execute_node(self, node, outcoming_ports, incoming_ports):
    # node_to_execute = self.node_registry[f"{node['packet']}/{node['path']}/{node['data']['name']}"]
    self.domain.Node.execute(node, outcoming_ports, incoming_ports)

    print('')


