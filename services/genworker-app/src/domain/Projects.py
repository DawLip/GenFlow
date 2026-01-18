import json
import copy


class Projects:
  def __init__(self, domain):
    self.domain = domain
    self.genworkerId = f"{domain.authRepo.user_id}:{domain.authRepo.worker_name}"

  def projects_list(self):
    projects = self.domain.file_system.ls("/projects")
    genworker_storage_id = self.genworkerId
    projects = [{ "name": p, "genworkerStorageId": genworker_storage_id } for p in projects]
    return projects

  def get_project_config(self, project_name):
    project_config = self.domain.file_system.get_file(f"projects/{project_name}/project.config.json")
    return json.loads(project_config)

  def get_flow_config(self, project_name, flow_name, flow_data=False):
    flow_config = json.loads(self.domain.file_system.get_file(f"projects/{project_name}/{flow_name}/flow.config.json"))

    if flow_data:
      flow_data = self.domain.file_system.get_file(f"projects/{project_name}/{flow_name}/flow.data.json")
      flow_config["data"] = json.loads(flow_data)
      flow_config["projectName"] = project_name

    return flow_config

  def create_flow(self, flow):
    flow_data = {
      "nodes": flow["nodes"],
      "edges": flow["edges"],
    }
    flow_config = copy.copy(flow)
    del flow_config["nodes"]
    del flow_config["edges"]

    flow_path = f"projects/{flow['projectName']}/{flow['name']}"
    self.domain.file_system.save_file(f"{flow_path}/flow.config.json", json.dumps(flow_config, indent=2))
    self.domain.file_system.save_file(f"{flow_path}/flow.data.json", json.dumps(flow_data, indent=2))
    
    project = self.get_project_config(flow["projectName"])
    project["flows"].append(flow["name"])
    self.domain.file_system.save_file(f"projects/{flow['projectName']}/project.config.json", json.dumps(project, indent=2))

    return flow
  
  def add_node(self, payload):
    project_name = payload["projectName"]
    flow_name = payload["flowName"]
    flow_path = f"projects/{project_name}/{flow_name}"
    
    flow_data = json.loads(self.domain.file_system.get_file(f"{flow_path}/flow.data.json"))
    flow_data["nodes"].append(payload["data"])
    self.domain.file_system.save_file(f"{flow_path}/flow.data.json", json.dumps(flow_data, indent=2))
    self.domain.console.trace("Projects", f"Node added to {project_name}/{flow_name}")

  def on_nodes_change(self, payload):
    self.domain.console.trace("Projects", f"on_nodes_change")
    project_name = payload["projectName"]
    flow_name = payload["flowName"]
    flow_path = f"projects/{project_name}/{flow_name}"
    
    flow_data = json.loads(self.domain.file_system.get_file(f"{flow_path}/flow.data.json"))
    for change in payload["data"]["changes"]:
      if change["type"] == "position":
        for node in flow_data["nodes"]:
          if node["id"] == change["id"]:
            node["position"] = change["position"]
            self.domain.file_system.save_file(f"{flow_path}/flow.data.json", json.dumps(flow_data, indent=2))
            break
      elif change["type"] == "dimensions":
        for node in flow_data["nodes"]:
          if node["id"] == change["id"]:
            node["style"]["width"] = change["dimensions"]["width"]
            node["style"]["height"] = change["dimensions"]["height"]
            break
      elif change["type"] == "remove":
        flow_data["nodes"] = [n for n in flow_data["nodes"] if n["id"] != change["id"]]
        break
    self.domain.file_system.save_file(f"{flow_path}/flow.data.json", json.dumps(flow_data, indent=2))

    
  def on_connect(self, payload):
    self.domain.console.trace("Projects", f"on_connect payload:")
    project_name = payload["projectName"]
    flow_name = payload["flowName"]
    flow_path = f"projects/{project_name}/{flow_name}"
    
    flow_data = json.loads(self.domain.file_system.get_file(f"{flow_path}/flow.data.json"))
    flow_data["edges"].append(payload["data"]["params"])
    self.domain.file_system.save_file(f"{flow_path}/flow.data.json", json.dumps(flow_data, indent=2))
    self.domain.console.trace("Projects", f"Edge added to {project_name}/{flow_name}")
      
  def on_edges_change(self, payload):
    self.domain.console.trace("Projects", f"on_edges_change")
    project_name = payload["projectName"]
    flow_name = payload["flowName"]
    flow_path = f"projects/{project_name}/{flow_name}"
    
    flow_data = json.loads(self.domain.file_system.get_file(f"{flow_path}/flow.data.json"))
    for change in payload["data"]["changes"]:
      if change["type"] == "update":
        for edge in flow_data["edges"]:
          if edge["id"] == change["id"]:
            edge.update(change)
            self.domain.console.trace("Projects", f"Edge updated in {project_name}/{flow_name}")
            break
      elif change["type"] == "remove":
        self.domain.console.trace("Projects", f"Edge removed from {project_name}/{flow_name}")
        flow_data["edges"] = [e for e in flow_data["edges"] if e["id"] != change["id"]]
        self.domain.console.trace("Projects", f"Edge removed from {project_name}/{flow_name}")
    self.domain.file_system.save_file(f"{flow_path}/flow.data.json", json.dumps(flow_data, indent=2))

  def on_value_change(self, payload):
    self.domain.console.trace("Projects", f"on_value_change")
    project_name = payload["projectName"]
    flow_name = payload["flowName"]
    flow_path = f"projects/{project_name}/{flow_name}"

    flow_data = json.loads(self.domain.file_system.get_file(f"{flow_path}/flow.data.json"))
    # self.domain.console.trace("flow_data before:", json.dumps(flow_data, indent=2))
    # self.domain.console.trace("\n\npayload data:", json.dumps(payload["data"], indent=2))
    for node in flow_data["nodes"]:
      if node["id"] == payload["data"]["nodeId"]:
        # self.domain.console.trace(f"[Projects] Node value change in {project_name}/{flow_name} node:", node["id"])
        for input in node["data"]["inputs"]:
          if input["id"] == payload["data"]["inputId"]:
            input["value"] = payload["data"]["value"]
            self.domain.file_system.save_file(f"{flow_path}/flow.data.json", json.dumps(flow_data, indent=2))
            break
        break
    # self.domain.console.trace("successfully updated value")