import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import time, os, random
import base64

class PipeGenerateImg2Img:
  def execute(self, Node, node, input_ports,  output_ports):
    print(f"PipeGenerate executing...")

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(input_ports['image'])

    image: Image.Image = input_ports['pipe'](
      prompt=input_ports['positivePrompt'],
      negative_prompt=input_ports['negativePrompt'],
      num_inference_steps=int(input_ports['steps']),  
      guidance_scale=int(input_ports['guidanceScale']),   
      height=int(input_ports['height']),
      width=int(input_ports['width']),
      generator=torch.Generator(device=device).manual_seed(int(input_ports['seed'])),
      image=input_ports['image'],
      strength=float(input_ports['strength'])
    ).images[0]
    
    output_ports['imageOutput'] = image
    
    pipe = None

Node = PipeGenerateImg2Img