import base64
import time
from PIL import Image
import os


class ImageLoader:
  def execute(self, Node, node, input_ports,  output_ports):
    print(f"[ImageSave] executing...")
    
    image = Image.open(Node.domain.file_system.get_absolute_path(input_ports["path"])).convert("RGB")
    image = image.resize((int(input_ports["width"]), int(input_ports["height"])))

    output_ports['image'] = image

Node = ImageLoader