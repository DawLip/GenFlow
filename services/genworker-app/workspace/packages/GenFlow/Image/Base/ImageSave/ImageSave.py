import base64
import time
from PIL import Image
import os


class ImageSave:
  def execute(self, Node, node, input_ports,  output_ports):
    print(f"[ImageSave] executing...")
    
    # os.makedirs(OUT_DIR, exist_ok=True)
    ts = int(time.time())
    path = Node.domain.file_system.get_absolute_path(f"files/sd15_{ts}.png")
    input_ports['imageInput'].save(path)

    with open(path, "rb") as f:
      b64 = base64.b64encode(f.read()).decode("ascii")
    try:
      Node.domain.task_scheduler.new_artifact({
        'type': 'image',
        'subtype': 'png',
        'location': f'files/',
        'name': f"sd15_{ts}.png",
        'nodeId': node['id'],
        'content':  b64,
      })
    except Exception as e:
      print(f"[ImageSave] Failed to save artifact: {e}")

Node = ImageSave