import base64
import time
from PIL import Image
import os


class ImageSave:
  def execute(self, Node, node, input_ports,  output_ports):
    Node.domain.app.console.log("ImageSave", f"Executing...")
    
    # os.makedirs(OUT_DIR, exist_ok=True)
    ts = int(time.time())
    path = Node.domain.file_system.get_absolute_path(f"files/sd15_{ts}.png")
    input_ports['imageInput'].save(path)

    with open(path, "rb") as f:
      b64 = base64.b64encode(f.read()).decode("ascii")
    Node.domain.task_scheduler.new_artifact({
      'type': 'image',
      'subtype': 'png',
      'location': f'files/',
      'name': f"sd15_{ts}.png",
      'nodeId': node['id'],
      'content':  b64,
    })

Node = ImageSave