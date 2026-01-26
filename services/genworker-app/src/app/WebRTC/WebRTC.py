from __future__ import annotations
from typing import TYPE_CHECKING, Protocol, Any
if TYPE_CHECKING:
	from domain.Domain import DomainProtocol

import asyncio
import json
from aiortc import RTCPeerConnection, RTCSessionDescription
from .webrtc_dispatch import webrtc_dispatch

class WebRTC(Protocol): 
  domain: DomainProtocol
  peers: dict[str, RTCPeerConnection]
  userPeersList:[]
  genworkerPeersList:[]
  task_scheduler = None
  file_system = None
  packages = None
  channels = {}
  rooms = {}

  def init(self, domain, token, worker_name): ...
  async def handle_signal(self, data): ...
  async def handle_get_signal(self, data): ...

class WebRTC:
  peers: dict[str, RTCPeerConnection] = {}
  userPeersList = []
  genworkerPeersList = []
  task_scheduler = None
  file_system = None
  packages = None
  channels = {}
  rooms = {}

  def __init__(self, domain):
    self.domain = domain

  def init(self, token, worker_name):
    self.file_system = self.domain.file_system
    # self.packages = self.domain.packages
    self.sio = self.domain.sio
    self.console = self.domain.console
    self.task_repo = self.domain.task_repo
    
    return self
  
  def build(self):
    pass

  def _bind_handlers(self):
    pass
    
  async def handle_signal(self, data):
    if self.peers[data["socketId"]] and "data" in data and data["data"].get("type") == "answer":
      answer = RTCSessionDescription(
        sdp=data["data"]["sdp"],
        type="answer"
      )

      await self.peers[data["socketId"]].setRemoteDescription(answer)
      
  async def handle_get_signal(self, data):
    if data["socketId"] not in self.peers:
      if data["clientType"]=="USER":      self.userPeersList.append({"socketId": data["socketId"], "clientType": data["clientType"], "userId": data["from"]})
      if data["clientType"]=="GENWORKER": self.genworkerPeersList.append({"socketId": data["socketId"], "clientType": data["clientType"], "genworkerId": data["from"]})

      pc = RTCPeerConnection()
      self.peers[data["socketId"]] = pc

      channel = pc.createDataChannel("server-data")
      self.channels[data["socketId"]] = channel
      @channel.on("open")
      def _on_open():
        try:
          channel.send(json.dumps({"hello": "Hello from master genworker"}))
        except Exception:
          pass

      @channel.on("message")
      def _on_msg(message):
        webrtc_dispatch(self, channel, json.loads(message))

      @channel.on("hello")
      def _on_msg(message):
        webrtc_dispatch(self, channel, json.loads(message))

      @pc.on("connectionstatechange")
      async def _state():
        self.console.debug("WebRTC", "Connection state changed:", self.peers[data["socketId"]].connectionState)
        
        if self.peers[data["socketId"]].connectionState in ("failed", "closed", "disconnected"):
          await self.peers[data["socketId"]].close()

          self.peers.pop(data["socketId"])
          obj = next((o for o in self.userPeersList if o.get("socketId") == data["socketId"]), None)
          if obj:
              self.userPeersList.remove(obj)
          obj = next((o for o in self.genworkerPeersList if o.get("socketId") == data["socketId"]), None)
          if obj:
              self.genworkerPeersList.remove(obj)
    pc = self.peers[data["socketId"]]

    offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    while pc.iceGatheringState != "complete":
      await asyncio.sleep(0.05)

    payload = { "data": {"type": pc.localDescription.type, "sdp": pc.localDescription.sdp}, "to": data["from"], "from": data["to"]}
    await self.sio.sio.emit("signal", payload)
    
