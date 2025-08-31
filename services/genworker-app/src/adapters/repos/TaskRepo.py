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

    
  
