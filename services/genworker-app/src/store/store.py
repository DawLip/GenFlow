from .slices.screenSlice import screenSlice
from .slices.ioQueueSlice import ioQueueSlice

class store:
  io_queue = ioQueueSlice()
  ui = {}
  screens = screenSlice()
  auth = {
    "email": "1",
    "password": "1",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTYxNGE2MDZmN2EzN2E3MjA3OWU3YiIsImlhdCI6MTc1NTA1Mjk3MywiZXhwIjoyMzAzNDY4MTYxNzN9.wNBc-8ZDUqmUVCaH96TbAMhogFTXrBGqM7qF_yuxgOI",
    "userId": ""
  }
  
