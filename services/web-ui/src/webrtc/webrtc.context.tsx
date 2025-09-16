import { createContext, useState, useContext, useEffect, useRef } from "react";

import { useSocket } from '@web-ui/socket/socket';
import { useDispatch, useSelector } from "react-redux";
import SimplePeer from 'simple-peer';
import { initWebRTCEvents } from "./webrtc.events";
import { webrtc_onConnect } from "./webrtc.onConnect";

export const WebRTCContext = createContext<any | null>(null);

export function useWebRTC(): any {
  const ctx = useContext(WebRTCContext);
  if (!ctx) throw new Error("useWebRTC must be used within <WebRTCProvider>");

  return ctx;
}

export default function WebRTCProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const socket = useSocket();

  const peers = useRef<any>({});

  const userId = useSelector((state: any) => state.client.userId);
  const master_genworker = useSelector((state: any) => state.team.masterGenworker);
  const storage_genworkers = useSelector((state: any) => state.team.storageGenworkers);

  useEffect(() => {
    console.log("WebRTCProvider useEffect triggered");
      if (!socket) return;
      if (!master_genworker) return;
      console.log("Setting up WebRTC connection with master_genworker:", master_genworker);

  
      function initPeer(id) {
        if (!socket) return;
        console.log("[WEBRTC] Initializing peer for:", id);

        peers.current[id] = new SimplePeer({
          initiator: false,
          trickle: false, 
          config: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              // { urls: "turn:turn.example.com:3478", username: "u", credential: "p" }
            ],
          },
        });

        peers.current[id].on("signal", (data) => {
          socket.emit("signal", { data, toGenworker: master_genworker, from: userId });
        });

        peers.current[id].on("connect", () => webrtc_onConnect(peers.current[id], id, userId, storage_genworkers));

        initWebRTCEvents(peers.current[id], dispatch);

        peers.current[id].on("error", (err) => console.log("[WEBRTC] Error: " + err.message));
        peers.current[id].on("close", () => console.log("[WEBRTC] Connection closed"));
      }
  
      socket.on("signal", (data) => {
        console.log("[WEBRTC] Signal:", data);
        if (data["from"] in peers.current) return;
        initPeer(data["from"]);
        peers.current[data["from"]].signal(data.data);
        
        console.log("new peer created for:", data["from"]);
      });
  
      socket.emit("get_signal", { genworkerId: master_genworker, clientType: "USER" });

      for (const storage_genworker of storage_genworkers) {
        socket.emit("get_signal", { genworkerId: storage_genworker, clientType: "USER" });
      }

      return () => {
        socket.off("signal");
        if (peers.current) {
          Object.values(peers.current).forEach((peer:any) => peer.destroy());
          peers.current = {};
        }
      };
    }, [master_genworker])

  const value = { 
    peers, 
    send: (id, event, payload) => peers.current[id].send(JSON.stringify({ event, payload, sender: userId })),
    sendToMaster: (event, payload) => peers.current[master_genworker].send(JSON.stringify({ event, payload, sender: userId }))

  };
  return (
    <WebRTCContext.Provider value={value}>
      {children}
    </WebRTCContext.Provider>
  );
}