from diffusers import StableDiffusionPipeline
from PIL import Image
import time, os, random
import base64
import torch

from transformers import logging as tlog
tlog.set_verbosity_error()  

from diffusers.utils import logging as dlog
dlog.set_verbosity_error()   
dlog.disable_progress_bar()

class Txt2ImgUnified:
  def execute(self, Node, node, input_ports,  output_ports):
    print(f"[Txt2ImgUnified] executing...")
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype  = torch.float16 if device == "cuda" else torch.float32

    pipe = StableDiffusionPipeline.from_pretrained(
        input_ports["model"],
        torch_dtype=dtype,
        safety_checker=None,   
    )
    pipe = pipe.to(device)

    pipe.enable_attention_slicing()    
    pipe.vae.enable_slicing()
    pipe.enable_vae_tiling()
    pipe.set_progress_bar_config(disable=True)

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
    
    
Node = Txt2ImgUnified