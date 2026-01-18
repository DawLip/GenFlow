import json
import asyncio


class TaskScheduler:
  gateway = None
  domain = None
  taskRepo = None
  
  def __init__(self, domain, gateway, taskRepo):
    self.gateway = gateway
    self.domain = domain
    self.taskRepo = taskRepo
  
  def init(self, user_id, worker_name):
    flows = [{"projectId": "1", "flowName":"1"}]
    
    genworker_id = self.gateway.register(user_id, worker_name)
    self.gateway.assign(genworker_id)
    
  def execute_flow(self, projectName, flowName):
    self.domain.console.trace("TaskScheduler", f"Executing flow:", f"'{flowName}' in project '{projectName}'")

    data = json.loads(self.domain.file_system.get_file(f"/projects/{projectName}/{flowName}/flow.data.json"))
    # print("[TASK_SCHEDULER] Flow data:", data)
    self.new_task(projectName, flowName, data)

  def new_task(self, projectName, flowName, data):
    # print(json.dumps(task, indent=1, ensure_ascii=False))
    self.domain.console.trace("TaskScheduler", "New task for flow:", f"'{flowName}' in project '{projectName}'")
    self.taskRepo.new_task({
      "data": data,
      "projectName": projectName,
      "flowName": flowName,
    })
    self.nodes_scheduler()
    
  def nodes_scheduler(self):
    self.domain.console.log("TaskScheduler", "Starting nodes scheduler...")
    cpu_worker = self.domain.cpu_worker
    
    nodes = self.taskRepo.nodes
    edges = self.taskRepo.edges
    
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
      cpu_worker.execute_node(node, outcoming_ports, incoming_ports)
    
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
      'projectName': self.taskRepo.projectName,
      'flowName': self.taskRepo.flowName,
      # 'artifact': toPrint
    }, json=True)

    for channel in self.domain.webrtc.rooms[self.taskRepo.flowName]:
      channel.send(json.dumps({"event": "NEW_ARTIFACT", "payload": {
        'projectName': self.taskRepo.projectName,
        'flowName': self.taskRepo.flowName,
        'artifact': artifact
      }}))
