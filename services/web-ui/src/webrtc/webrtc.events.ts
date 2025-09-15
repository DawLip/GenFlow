import SimplePeer from 'simple-peer';


export const initWebRTCEvents = (peer:SimplePeer) => {
  peer.on("data", (buf) => {
    console.log("[WEBRTC] Received:", JSON.parse(buf.toString()));
  });
}