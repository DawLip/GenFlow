from diffusers import StableDiffusionImg2ImgPipeline
from PIL import Image
import time, os, random
import base64

class Pipe_FromFile_I2I:
  def execute(self, Node, node, input_ports,  output_ports):
    import torch
    print(f"Pipe_FromFile_I2I executing...")
    
    torch.cuda.empty_cache()
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype  = torch.float16 
    # if device == "cuda" else torch.float32

    pipe = StableDiffusionImg2ImgPipeline.from_single_file(
        Node.domain.file_system.get_absolute_path("models/checkpoints/" + input_ports["model"]),
        torch_dtype=dtype,
        safety_checker=None,   
    )
    # pipe = pipe.to(device)

    pipe.enable_attention_slicing()    
    pipe.enable_vae_slicing()
    pipe.enable_vae_tiling()
    pipe.enable_sequential_cpu_offload()
    if device == "cuda":
        try:
            pipe.enable_xformers_memory_efficient_attention()
        except Exception:
            pass  

    output_ports['pipe'] = pipe
    
    
Node = Pipe_FromFile_I2I