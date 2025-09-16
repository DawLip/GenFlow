import json

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
