import json


class Packages:
  domain = None
  gateway = None

  def __init__(self, domain, gateway):
    self.domain = domain
    self.gateway = gateway
    
  def get_nodes_list(self):
    nodes_list = []
    packages_list = self.domain.file_system.ls("packages")
    
    for package_name in packages_list:
      
      package = json.loads(self.domain.file_system.get_file(f"packages/{package_name}/config.json"))
      nodes_list.extend([f"{package_name}/{node}" for node in package["nodes"]])

    return nodes_list

  async def get_nodes(self, data):
    packages = []
    packages_list = self.domain.file_system.ls("packages")
    
    for package_name in packages_list:
      
      package = json.loads(self.domain.file_system.get_file(f"packages/{package_name}/config.json"))
      package_nodes = package["nodes"]
      package["nodes"] = []
      
      for node in package_nodes:
        node_data = self.domain.file_system.get_file(f"packages/{package_name}/{node}/{node.split('/')[-1]}.json")
        package["nodes"].append(json.loads(node_data))

      packages.append(package)
    await self.gateway.genworker_get_nodes_answer({"packages": packages, "userId": data["userId"], "workerId": data["workerId"]})