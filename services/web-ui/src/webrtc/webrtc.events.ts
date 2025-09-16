import { setProjectsList, setProject } from '@web-ui/store/slices/projectsRepoSlice';
import SimplePeer from 'simple-peer';
import { setFlow } from '@web-ui/store/slices/flowsRepoSlice';

const dispatchRTC = {
  "PROJECTS_LIST": (peer, dispatch, payload) => {
    console.log("[WEBRTC] PROJECTS_LIST", payload);
    dispatch(setProjectsList(payload["projects"]));
  },
  "PROJECT_CONFIG": (peer, dispatch, payload) => {
    console.log("[WEBRTC] PROJECT_CONFIG", payload);
    dispatch(setProject(payload["projectConfig"]));
  },
  "FLOW_CONFIG": (peer, dispatch, payload) => {
    console.log("[WEBRTC] FLOW_CONFIG", payload);
    dispatch(setFlow(payload["flowConfig"]));
  }
}

export const initWebRTCEvents = (peer:SimplePeer, dispatch) => {
  peer.on("data", (buf) => {
    console.log("[WEBRTC] Received:", JSON.parse(buf.toString()));
    const { event, payload } = JSON.parse(buf.toString());
    if (dispatchRTC[event]) dispatchRTC[event](peer, dispatch, payload);
  });
}

