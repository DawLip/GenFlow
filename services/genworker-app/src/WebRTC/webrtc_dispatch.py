def webrtc_dispatch(webrtc, data):
  dispatch[data["event"]](webrtc, data["sender"], data["payload"])

dispatch={
  "TEST": lambda webrtc, sender, payload: print("[WebRTC] TEST", payload),
}