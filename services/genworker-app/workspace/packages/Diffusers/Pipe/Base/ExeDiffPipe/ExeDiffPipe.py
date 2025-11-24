import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import time, os, random
import base64

class ExeDiffPipe:
  def execute(self, Node, node, input_ports,  output_ports):
    print("input_ports:", input_ports)
    print(f"ExeDiffPipe executing...")
    
    device = "cuda" if torch.cuda.is_available() else "cpu"

    image: Image.Image = input_ports["pipe"](
        prompt=input_ports['positivePrompt'],
        negative_prompt=input_ports['negativePrompt'],
        num_inference_steps=int(input_ports['steps']),  
        guidance_scale=int(input_ports['guidanceScale']),   
        height=int(input_ports['height']),
        width=int(input_ports['width']),
        generator=torch.Generator(device=device).manual_seed(int(input_ports['seed'])),
    ).images[0]
    
    output_ports['imageOutput'] = image
    
    
Node = ExeDiffPipe