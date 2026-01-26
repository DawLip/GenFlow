import json


class TaskScheduler:
  gateway = None
  domain = None
  task_repo = None
  
  def __init__(self, domain, ):
    self.domain = domain
    
  def build(self):
    # self.gateway = self.domain.task_sheduler_gateway
    self.task_repo = self.domain.task_repo
  
  def init(self, user_id, worker_name):    
    pass
    
  def execute_flow(self, payload):
    self.project_name = payload["project_name"]
    self.flow_name = payload["flow_name"]
    self.selected_node_id = payload["node_id"]
    # self.domain.console.trace("TaskScheduler", f"Executing flow:", f"'{flowName}' in project '{projectName}'")

    flow_data = json.loads(self.domain.file_system.get_file(f"/projects/{self.project_name}/{self.flow_name}/flow.data.json"))
    self.nodes_scheduler(flow_data["nodes"], flow_data["edges"])
    # print("[TASK_SCHEDULER] Flow data:", data)
    # self.new_task(projectName, flowName, data)

  def new_task(self, projectName, flowName, data):
    # print(json.dumps(task, indent=1, ensure_ascii=False))
    # self.domain.console.trace("TaskScheduler", "New task for flow:", f"'{flowName}' in project '{projectName}'")
    # self.task_repo.new_task({
    #   "data": data,
    #   "projectName": projectName,
    #   "flowName": flowName,
    # })
    # self.nodes_scheduler()
    pass
    
  def nodes_scheduler(self, nodes, edges):
    self.domain.console.log("TaskScheduler", "Starting nodes scheduler...")

    
    indegree, adjacency_list, available_nodes, outcoming_ports, incoming_ports = self.compute_indegree_and_adjacency(edges, nodes)
    
    self.domain.console.debug("TaskScheduler", "Indegree:", indegree, json=True)
    self.domain.console.debug("TaskScheduler", "Adjacency List:", adjacency_list, json=True)
    self.domain.console.debug("TaskScheduler", "Available Nodes:", available_nodes)
    
    while available_nodes:
      node_id = available_nodes.pop()
      node = [x for x in nodes if x["id"] == node_id][0]

      for adjacent in adjacency_list[node_id]:
        indegree[adjacent] -= 1
        if indegree[adjacent] == 0: available_nodes.add(adjacent)

      self.domain.console.trace("TaskScheduler", f"Executing node:", node_id)
      self.domain.cpu_worker.execute_node(node, outcoming_ports, incoming_ports)
    
    self.domain.console.log("TaskScheduler", "All nodes have been executed.")

  def compute_indegree_and_adjacency(self, edges, nodes):
    available_nodes = set()  
    indegree = {}
    adjacency_list = {}
    
    outcoming_ports = {}
    incoming_ports = {}
    
    for node in nodes:
      available_nodes.add(node["id"])
      indegree[node["id"]] = 0
      adjacency_list[node["id"]] = []

    for edge in edges:
      available_nodes.discard(edge["target"])
      indegree[edge["target"]] += 1
      adjacency_list[edge["source"]].append(edge["target"])
      
      outcoming_ports[(edge["source"], edge["sourceHandle"])] = ( edge["target"], edge["targetHandle"] )
      incoming_ports[(edge["target"], edge["targetHandle"])] = ( edge["source"], edge["sourceHandle"] )

    return indegree, adjacency_list, available_nodes, outcoming_ports, incoming_ports
  
  def new_artifact(self, artifact):
    # toPrint = artifact.copy()
    # toPrint['content'] = str(toPrint['content'])[:20] + '...' if len(str(toPrint['content'])) > 20 else str(toPrint['content'])
    self.domain.console.trace("TaskScheduler", "New artifact:", {
      'projectName': self.project_name,
      'flowName': self.flow_name,
      # 'artifact': toPrint
    }, json=True)

    self.domain.app.queues["App"].put(
      ("WEBRTC", {
        "rooms": f"{self.project_name}/{self.flow_name}",
        "payload":json.dumps({"event": "NEW_ARTIFACT", "payload": {
          'projectName': self.project_name,
          'flowName': self.flow_name,
          'artifact': artifact
        }})
      })
    )

    # for channel in self.domain.webrtc.rooms[self.task_repo.flowName]:
    #   channel.send(json.dumps({"event": "NEW_ARTIFACT", "payload": {
    #     'projectName': self.project_name,
    #     'flowName': self.flow_name,
    #     'artifact': artifact
    #   }}))
