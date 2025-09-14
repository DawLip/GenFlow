'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {

  ReactFlowProvider,
  useReactFlow,
  useStore
} from '@xyflow/react';
import { throttle } from 'lodash';
import SimplePeer from 'simple-peer';

import { AppDispatch } from '@web-ui/store';
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  addNode,
} from '@web-ui/store/slices/flowsSlice';

import '@xyflow/react/dist/style.css';
import { Aside } from '@web-ui/components/Aside/Aside';
import { useSocket } from '@web-ui/socket/socket';
import { DnDProvider } from '../../utils/DnDContext';

import { featchNodesThunk } from '@web-ui/store/thunks/flow/featchNodesThunk';
import { setPackages } from '@web-ui/store/slices/packagesSlice';
import { newArtifact } from '@web-ui/store/slices/artifactsSlice';
import { FlowWorkspace } from '@web-ui/components/FlowWorkspace';

function Page() {
  const socket = useSocket();
  const dispatch = useDispatch<AppDispatch>();

  const flowID = useSelector((state: any) => state.session.selectedFlow);
  
  const selectedFlowName = flowID && useSelector((state: any) => state.flows[flowID].name);
  const selectedFlowPath = flowID && useSelector((state: any) => state.flows[flowID].path);

  const master_genworker = flowID && useSelector((state: any) => state.flows[flowID].genworkers[0]);

  const { getViewport } = useReactFlow();
  const [x, y, zoom] = useStore((s) => s.transform);
  
  const userId = useSelector((state: any) => state.client.userId);
  const projectId = useSelector((state: any) => state.project.projectId);
  
  const reactFlowRef = useRef<HTMLDivElement>(null);  
  
  const [remoteCursor, setRemoteCursor] = useState<{ x: number; y: number } | null>(null);
  const [mV, setMv] = useState(true);
  
  const peerRef = useRef<any>(null);
  // --------------
  useEffect(() => {
    if (!socket) return;
    if (peerRef.current) return;
    let peer;

    function initPeer() {
      if (!socket) return;
      console.log("Inicjalizacja peer");

      peer = new SimplePeer({
        initiator: false,
        trickle: false, 
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            // { urls: "turn:turn.example.com:3478", username: "u", credential: "p" }
          ],
        },
      });

      peer.on("signal", (data) => {
        socket.emit("signal", { data, toGenworker: master_genworker, from: userId });
      });

      peer.on("connect", () => {
        console.log("Połączono przez WebRTC ✅");
      });

      peer.on("data", (buf) => {
        console.log("[WEBRTC] Received:", JSON.parse(buf.toString()));
      });

      peer.on("error", (err) => console.log("[WEBRTC] Error: " + err.message));
      peer.on("close", () => console.log("[WEBRTC] Connection closed"));
    }

    socket.once("signal", (data) => {
      console.log("[WEBRTC] Signal:", data);
      if (!peerRef.current) initPeer();
      peer.signal(data.data);
    });

    socket.emit("get_signal", { genworkerId: master_genworker, clientType: "USER" });
    peerRef.current = peer;

    return () => {
      socket.off("signal");
      if (peer) {
        peer.destroy();
        peerRef.current = null;
      }
    };
  }, [])
  

  // --------------

  useEffect(() => {
    dispatch(featchNodesThunk(socket))
  },[])

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      const { x, y, zoom } = getViewport();
      const rect = reactFlowRef.current?.getBoundingClientRect();
      if (!rect) return;

      socket?.emit('flow_mouse_move',{
        userId, 
        projectId, 
        flowName: selectedFlowName,
        path: selectedFlowPath,
        x: (e.clientX - rect.left - x)/zoom, 
        y: (e.clientY - rect.top - y)/zoom
      })
    }, 100);

    socket?.on('flow_mouse_move', (data)=>{
      // console.log('mouse pos received', data);
      if(
        reactFlowRef.current &&
        data.x>0 &&
        data.x<reactFlowRef.current?.clientWidth &&
        data.y>0 &&
        data.y<reactFlowRef.current?.clientHeight
        ){
        setRemoteCursor({ x: data.x, y: data.y });
        setMv(true);
      } else setMv(false);
    })

    socket?.on('flow_update', (data)=>{
      console.log('flow update received', data);

      switch(data.context){
        case 'addNode': dispatch(addNode(data.data)); break;
        case 'onNodesChange': dispatch(onNodesChange(data.data)); break;
        case 'onEdgesChange': dispatch(onEdgesChange(data.data)); break;
        case 'onConnect': dispatch(onConnect(data.data)); break;
      }
    })

    const el = reactFlowRef.current;
    el?.addEventListener('mousemove', handleMouseMove);

    return () => {
      el?.removeEventListener('mousemove', handleMouseMove);
      socket?.off('flow_mouse_move');
      socket?.off('flow_update');
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket?.on('connect', () => {
      console.log('[SOCKET] Socket connected');
    });

    socket.once('genworker_get_nodes_answer', (msg: any) => {
      console.log("genworker_get_nodes_answer:", msg)

      dispatch(setPackages(msg.packages))
    })

    socket.on('new_artifact', (data:any) => {
      console.log('new_artifact received', data);
      dispatch(newArtifact({...data.artifact, time: (new Date()).toISOString()}));
    });

    return () => {
      socket.off('connect');
      socket.off('genworker_get_nodes_answer');
      socket.off('new_artifact');
    };
  }, [socket]);

  return (
    <>
      <Aside tabs={['Hierarchy', 'Nodes', 'Files']} />
      <div className="w-full h-full bg-[#0F0B14]">
        {mV && remoteCursor && <div className="absolute w-4 h-4 bg-red-500 rounded-full" style={{
          top: remoteCursor.y * zoom + y + 48,
          left: remoteCursor.x * zoom + x + 270,
        }}></div>}
        {flowID && <FlowWorkspace reactFlowRef={reactFlowRef}/>}
      </div>
      <Aside tabs={['Inspector', 'Runs', 'Artifacts']} />
    </>
  );
}
function Providers() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <Page />
      </DnDProvider>
    </ReactFlowProvider>
  );
}

export default Providers;

