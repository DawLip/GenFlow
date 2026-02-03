import { setProjectsList, setProject } from '@web-ui/store/slices/projectsRepoSlice';
import SimplePeer from 'simple-peer';
import { setFlow } from '@web-ui/store/slices/flowsRepoSlice';
import { setPackages } from '@web-ui/store/slices/packagesSlice';
import { newArtifact } from '@web-ui/store/slices/artifactsSlice';
import { Artifacts } from '../components/Aside/Artifacts';

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
  },
  "PACKAGE_NODES": (peer, dispatch, payload) => {
    console.log("[WEBRTC] PACKAGE_NODES", payload);
    dispatch(setPackages(payload));
  },
  "NEW_ARTIFACT": (peer, dispatch, payload) => {
    console.log("[WEBRTC] NEW_ARTIFACT", payload);
    dispatch(newArtifact({...payload.artifact, "flowName": payload.flowName, time: (new Date()).toISOString()}));
  }
}

export const initWebRTCEvents = (peer:SimplePeer, dispatch) => {
  peer.on("data", (buf) => {
    console.log("[WEBRTC] Received:", JSON.parse(buf.toString()));
    const { event, payload } = JSON.parse(buf.toString());
    if (dispatchRTC[event]) dispatchRTC[event](peer, dispatch, payload);
  });
}

