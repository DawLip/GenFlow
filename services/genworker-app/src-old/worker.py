import asyncio

from store.store import store as s

async def worker():
  ui_in = s.io_queue.ui_in
  ui_out = s.io_queue.ui_out
  
  while True:
    msg = await ui_in.get()
    if msg == ("quit",):
      await ui_out.put(("status", "Zamykanie..."))
      break
    if msg[0] == "start":
      n = msg[1]
      for i in range(1, n+1):
        await asyncio.sleep(0.5)
        await ui_out.put(("progress", f"{i}/{n}"))
      await ui_out.put(("status", "Gotowe"))