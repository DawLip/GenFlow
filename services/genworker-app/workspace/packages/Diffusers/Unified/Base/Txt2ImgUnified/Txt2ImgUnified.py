import torch
from diffusers import StableDiffusionPipeline
from PIL import Image
import time, os, random
import base64

class Txt2ImgUnified:
  def execute(self, Node, node, input_ports,  output_ports):
    print("input_ports:", input_ports)
    print(f"Txt2ImgUnified executing...")

    MODEL_ID = "runwayml/stable-diffusion-v1-5"
    OUT_DIR  = "./services/genworker-app/workspace/files"
    os.makedirs(OUT_DIR, exist_ok=True)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype  = torch.float16 if device == "cuda" else torch.float32

    pipe = StableDiffusionPipeline.from_pretrained(
        MODEL_ID,
        torch_dtype=dtype,
        safety_checker=None,   
    )
    pipe = pipe.to(device)

    # Tryby oszczędzania VRAM – włączaj śmiało na laptopowych GPU:
    pipe.enable_attention_slicing()     # mniejsze zużycie pamięci
    pipe.enable_vae_slicing()
    pipe.enable_vae_tiling()
    if device == "cuda":
        try:
            pipe.enable_xformers_memory_efficient_attention()
        except Exception:
            pass  # xformers nie jest wymagany

    seed = int(input_ports['seed'])
    generator = torch.Generator(device=device).manual_seed(seed)

    prompt = input_ports['positivePrompt']
    negative_prompt = input_ports['negativePrompt']

    image: Image.Image = pipe(
        prompt=prompt,
        negative_prompt=negative_prompt,
        num_inference_steps=int(input_ports['steps']),  
        guidance_scale=int(input_ports['guidanceScale']),   
        height=int(input_ports['height']),
        width=int(input_ports['width']),
        generator=generator,
    ).images[0]

    ts = int(time.time())
    path = os.path.join(OUT_DIR, f"sd15_{ts}_seed{seed}.png")
    image.save(path)
    
    with open(path, "rb") as f:
      b64 = base64.b64encode(f.read()).decode("ascii")
    
    Node.domain.task_scheduler.new_artifact({
      'type': 'image',
      'subtype': 'png',
      'location': f'files/{path}',
      'name': f"sd15_{ts}_seed{seed}.png",
      'nodeId': node['id'],
      'content':  b64,
    })
    
Node = Txt2ImgUnified