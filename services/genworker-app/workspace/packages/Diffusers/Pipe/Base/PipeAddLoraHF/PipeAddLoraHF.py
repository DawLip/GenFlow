from diffusers import StableDiffusionPipeline
from PIL import Image
import time, os, random
import base64
import torch

class PipeAddLoraHF:
  def execute(self, Node, node, input_ports,  output_ports):
    Node.domain.app.console.log("PipeAddLoraHF", f"Executing...")

    pipe = input_ports['pipe']
    pipe.load_lora_weights(input_ports['loraName'], adapter_name="lora-" + node["id"])
    pipe.set_adapters("lora-" + node["id"], weight=float(input_ports['weight']))

    output_ports['pipe'] = pipe

Node = PipeAddLoraHF