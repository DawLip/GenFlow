from diffusers import DDIMScheduler, LMSDiscreteScheduler, DPMSolverMultistepScheduler,EulerDiscreteScheduler, StableDiffusionPipeline, AutoencoderKL
import matplotlib.pyplot as plt

import torch
import os

import requests
from io import BytesIO


from diffusers import DDPMScheduler, UNet2DModel, StableDiffusionPipeline, EulerAncestralDiscreteScheduler

os.environ["QT_QPA_PLATFORM"] = "offscreen"
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"

file_server_url = "http://localhost:3005/upload"

def generate():
  models_path = './models/checkpoints/'
  model_name = 'realisticVisionV60B1_v60B1VAE.safetensors'

  prompt = "portrait photo of beautiful 26 y.o woman, makeup, 8k uhd, high quality, dramatic, cinematic"
  negative_prompt = "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime), text, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck,"

  batch_size = 1
  latent_channels = 4
  height = 512
  width = 512

  generator = torch.Generator("cuda").manual_seed(1234)

  latents = torch.randn(
      (batch_size, latent_channels, height // 8, width // 8),
      generator=generator,
      device="cuda",
      dtype=torch.float16
  )
  
  pipe = StableDiffusionPipeline.from_single_file(
    f'{models_path}{model_name}',
    torch_dtype=torch.float16,
    safety_checker=None
)
  pipe = pipe.to("cuda")
  pipe.enable_attention_slicing()

  pipe.scheduler = EulerAncestralDiscreteScheduler.from_config(pipe.scheduler.config, use_karras_sigmas=True)
  generator = torch.Generator("cuda").manual_seed(12345)
  image = pipe(
      prompt=prompt,
      negative_prompt=negative_prompt,
      height=512,
      width=512,
      num_inference_steps=30,
      guidance_scale=8,
      generator=generator,
      output_type="pil",
      return_dict=True,
      latents=latents
  )

  pil_image = image.images[0]

  img_byte_arr = BytesIO()
  pil_image.save(img_byte_arr, format='PNG')
  img_byte_arr.seek(0)

  response = requests.post(file_server_url, files={'file': ('output.png', img_byte_arr, 'image/png')})

  print("Upload response:", response.status_code, response.text)