import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import time, os, random
import base64

class PipeFromPretrained:
  def execute(self, Node, node, input_ports,  output_ports):
    print("input_ports:", input_ports)
    print(f"PipeFromPretrained executing...")
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype  = torch.float16 if device == "cuda" else torch.float32

    pipe = StableDiffusionPipeline.from_pretrained(
        input_ports["model"],
        torch_dtype=dtype,
        safety_checker=None,   
    )
    pipe = pipe.to(device)

    pipe.enable_attention_slicing()    
    pipe.enable_vae_slicing()
    pipe.enable_vae_tiling()
    if device == "cuda":
        try:
            pipe.enable_xformers_memory_efficient_attention()
        except Exception:
            pass  

    image: Image.Image = pipe(
        prompt=input_ports['positivePrompt'],
        negative_prompt=input_ports['negativePrompt'],
        num_inference_steps=int(input_ports['steps']),  
        guidance_scale=int(input_ports['guidanceScale']),   
        height=int(input_ports['height']),
        width=int(input_ports['width']),
        generator=torch.Generator(device=device).manual_seed(int(input_ports['seed'])),
    ).images[0]
    
    output_ports['imageOutput'] = image
    
    
Node = PipeFromPretrained