from store.store import store as s

async def ui_reader():
  ui_out = s.io_queue.ui_out
  ui = s.ui
  
  while True:
    typ, payload = await ui_out.get()
    if typ == "status":
      ui["lbl"].config(text=f"Status: {payload}")
      if payload.startswith("Zamykanie"):
        ui["root"].destroy(); break
    elif typ == "progress":
      ui["lbl"].config(text=f"Postęp: {payload}")