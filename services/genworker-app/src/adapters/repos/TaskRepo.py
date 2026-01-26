import json
import uuid

class TaskRepo:
  def __init__(self, domain):
    self.domain = domain
  
  def build(self):
    self.worker_queue = self.domain.app.queues["Worker"]
    
  def new_task(self, task):
    self.domain.console.trace("TaskRepo", "Create event")

    self.worker_queue.put(("EXECUTE_FLOW", {
      "task_id": uuid.uuid4(),
      **task
    }))
    
  
