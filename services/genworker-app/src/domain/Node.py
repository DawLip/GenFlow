class Node:
  def __init__(self, domain):
    self.domain = domain
    self.outputs = {}
    self.node_repo = domain.node_repo

  def return_data(self, target, data):
    self.outputs[target] = data

  def get_data(self, target):
    return self.outputs[target]
  
  def execute(self, node, outcoming_ports, incoming_ports):
    print(f"\nExecuting node {node['data']['name']}: {node['id']}")
    
    node_to_execute = self.node_repo.get(self.node_repo.get_node_path(node))
    
    input_ports = {}
    output_ports = {}
    print("test")
    if 'inputs' in node['data']:
      for input in node['data']['inputs']:
        if "value" in input and input["value"]:
          input_ports[input["name"]] = input["value"]
        else:
          input_ports[input["name"]] = self.get_data(incoming_ports[(node['id'], input["id"])])
    print("input_ports:", input_ports, incoming_ports)
    node_to_execute.execute(self, node, input_ports, output_ports)

    if 'outputs' in node['data']:
      for output in node['data']['outputs']:
        self.return_data((node['id'], output["id"]), output_ports[output["name"]])
      
