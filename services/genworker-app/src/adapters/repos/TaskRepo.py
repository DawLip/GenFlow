import json


class TaskRepo:
  _nodes: str|None = None
  _edges: str|None = None
  
  @property
  def nodes(self):
    return self._nodes
  
  @property
  def edges(self):
    return self._edges
  
  def new_task(self, task):
    self._nodes = task["data"]["nodes"]
    self._edges = task["data"]["edges"]
    self._taskId = task["id"]
    self._projectId = task["projectId"]
    self._flowName = task["flowName"]
    self._path = task["path"]
    
    print(f"\nNew task: {self._taskId} \nfor project {self._projectId} flow {self._flowName} at {self._path} \nwith {len(self._nodes)} nodes and {len(self._edges)} edges")
    print(json.dumps(task, indent=2, ensure_ascii=False))

    
  
