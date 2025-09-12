import base64
import time
from PIL import Image
import os


class ImageInput:
  def execute(self, Node, node, input_ports,  output_ports):
    print(f"ImageInput executing...")
    
    OUT_DIR  = "./services/genworker-app/workspace/files"
    os.makedirs(OUT_DIR, exist_ok=True)
    ts = int(time.time())
    path = os.path.join(OUT_DIR, f"sd15_{ts}.png")
    input_ports['imageInput'].save(path)

    with open(path, "rb") as f:
      b64 = base64.b64encode(f.read()).decode("ascii")
    
    Node.domain.task_scheduler.new_artifact({
      'type': 'image',
      'subtype': 'png',
      'location': f'files/{path}',
      'name': f"sd15_{ts}.png",
      'nodeId': node['id'],
      'content':  b64,
    })

Node = ImageInput