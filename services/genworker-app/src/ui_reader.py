from store.store import store as s

async def ui_reader():
  ui_out = s.io_queue.ui_out
  ui = s.ui
  
  while True:
    typ, payload = await ui_out.get()
    # if typ == "status":
    #   s.screens["login"].lbl.config(text=f"Status: {payload}")
    #   if payload.startswith("Zamykanie"):
    #     s.screens.root.destroy(); break
    # elif typ == "progress":
    #   s.screens["login"].lbl.config(text=f"Postęp: {payload}")