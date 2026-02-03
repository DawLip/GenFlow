import { client } from "@web-ui/utils/apollo-client";

export const webrtc_onConnect = (peer, peerId, userId, storage_genworkers) => {
  const send = (event, payload) => peer.send(JSON.stringify({ event, payload, sender: userId }));
  
  console.log("[WEBRTC] Connection established ✅");

  send("HELLO", { msg: "Hello from client!", clientType: "USER" });
}
