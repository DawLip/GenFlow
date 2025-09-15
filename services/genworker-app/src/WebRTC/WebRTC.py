import asyncio
import json
import socketio
import threading
from aiortc import RTCPeerConnection, RTCSessionDescription
from .webrtc_dispatch import webrtc_dispatch

class WebRTC:
  peers: dict[str, RTCPeerConnection] = {}
  userPeersList = []
  genworkerPeersList = []
  task_scheduler = None
  file_system = None
  packages = None
  channel = None

  @classmethod
  def _bind_handlers(cls):
    pass

  @classmethod
  def worker(cls, token, worker_name):
    cls._bind_handlers()
    
  @classmethod
  async def handle_signal(cls, data):
    if cls.peers[data["socketId"]] and "data" in data and data["data"].get("type") == "answer":
      answer = RTCSessionDescription(
        sdp=data["data"]["sdp"],
        type="answer"
      )

      await cls.peers[data["socketId"]].setRemoteDescription(answer)
      
  @classmethod
  async def handle_get_signal(cls, data):
    if data["socketId"] not in cls.peers:
      if data["clientType"]=="USER":      cls.userPeersList.append({"socketId": data["socketId"], "clientType": data["clientType"], "userId": data["from"]})
      if data["clientType"]=="GENWORKER": cls.genworkerPeersList.append({"socketId": data["socketId"], "clientType": data["clientType"], "genworkerId": data["from"]})

      pc = RTCPeerConnection()
      cls.peers[data["socketId"]] = pc

      cls.channel = pc.createDataChannel("server-data")
      @cls.channel.on("open")
      def _on_open():
        try:
          cls.channel.send(json.dumps({"hello": "👋 Hello from master genworker"}))
        except Exception:
          pass

      @cls.channel.on("message")
      def _on_msg(message):
        print("[WebRTC] recv:", message)
        webrtc_dispatch(cls, json.loads(message))
        
      @cls.channel.on("hello")
      def _on_msg(message):
        print("[WebRTC] recv:", message)
        webrtc_dispatch(cls, json.loads(message))

      @pc.on("connectionstatechange")
      async def _state():
        print("[WebRTC] state:", cls.peers[data["socketId"]].connectionState)
        
        if cls.peers[data["socketId"]].connectionState in ("failed", "closed", "disconnected"):
          await cls.peers[data["socketId"]].close()
          cls.peers[data["socketId"]] = None
          
        print("[WebRTC] users: ", [p["socketId"] for p in cls.userPeersList])
        print("[WebRTC] genworkers: ", [p["socketId"] for p in cls.genworkerPeersList])

    pc = cls.peers[data["socketId"]]

    offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    while pc.iceGatheringState != "complete":
      await asyncio.sleep(0.05)

    payload = { "data": {"type": pc.localDescription.type, "sdp": pc.localDescription.sdp}, "to": data["from"], "from": data["to"]}
    await cls.sio.sio.emit("signal", payload)
      
    
  @classmethod
  def init(cls, domain, token, worker_name):
    threading.Thread(target=cls.worker, args=(token, worker_name), daemon=True).start()
    cls.task_scheduler = domain.task_scheduler
    cls.file_system = domain.file_system
    cls.packages = domain.packages
    cls.sio = domain.sio
    
    return cls
