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
