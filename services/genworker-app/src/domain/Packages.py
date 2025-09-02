import json


class Packages:
  domain = None
  gateway = None

  def __init__(self, domain, gateway):
    self.domain = domain
    self.gateway = gateway

  def get_nodes(self, data):
    nodes = []
    packages_list = self.domain.file_system.ls("packages")
    
    for package_name in packages_list:
      print(f"Found package: {package_name}")
      
      package = json.loads(self.domain.file_system.get_file(f"packages/{package_name}/config.json"))
      package_nodes = package["nodes"]
      package["nodes"] = []
      
      for node in package_nodes:
        node_data = self.domain.file_system.get_file(f"packages/{package_name}/{node}.json")
        package["nodes"].append(json.loads(node_data))

      nodes.append(package)

    self.gateway.genworker_get_nodes_answer({"nodes": nodes, "userId": data["userId"], "workerId": data["workerId"]})