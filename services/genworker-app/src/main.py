import threading

from SIO import SIO
from ui.ui_factory import ui_factory

SIO.init("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTYxNGE2MDZmN2EzN2E3MjA3OWU3YiIsImlhdCI6MTc1NTA1Mjk3MywiZXhwIjoyMzAzNDY4MTYxNzN9.wNBc-8ZDUqmUVCaH96TbAMhogFTXrBGqM7qF_yuxgOI")
ui = ui_factory("console").init()

while True:
  pass