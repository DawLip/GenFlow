from diffusers import StableDiffusionPipeline
from PIL import Image
import time, os, random
import base64
import torch

class PipeFromPretrainedHF:
  def execute(self, Node, node, input_ports,  output_ports):
    Node.domain.app.console.log("PipeFromPretrainedHF", f"Executing...")
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype  = torch.float16 
    # if device == "cuda" else torch.float32

    pipe = StableDiffusionPipeline.from_pretrained(
        input_ports["model"],
        torch_dtype=dtype,
        safety_checker=None,   
    )
    pipe = pipe.to(device)

    pipe.enable_attention_slicing()    
    pipe.vae.enable_slicing()
    pipe.enable_vae_tiling()
    if device == "cuda":
        try:
            pipe.enable_xformers_memory_efficient_attention()
        except Exception:
            pass  

    output_ports['pipe'] = pipe
    
    
Node = PipeFromPretrainedHF