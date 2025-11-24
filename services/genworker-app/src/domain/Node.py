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
    print(f"\n[NODE EXECUTOR] Executing node {node['data']['name']}: {node['id']}")
    print(self.node_repo.get_node_path(node))
    try:
      node_to_execute = self.node_repo.get(self.node_repo.get_node_path(node))
    except Exception as e:
      print(f"[NODE EXECUTOR] Error: Node {node['data']['name']} not found in repository.")
      raise e
    input_ports = {}
    output_ports = {}
    if 'inputs' in node['data']:
      for input in node['data']['inputs']:
        if "value" in input and input["value"]:
          input_ports[input["name"]] = input["value"]
        else:
          input_ports[input["name"]] = self.get_data(incoming_ports[(node['id'], input["id"])])
    # print("input_ports:", input_ports, incoming_ports)
    print("2")
    node_to_execute.execute(self, node, input_ports, output_ports)
    print("3")
    if 'outputs' in node['data']:
      for output in node['data']['outputs']:
        self.return_data((node['id'], output["id"]), output_ports[output["name"]])
        
    print(f"[NODE EXECUTOR] Finished executing node {node['data']['name']}: {node['id']}\n")
      
