'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {

  ReactFlowProvider,
  useReactFlow,
  useStore
} from '@xyflow/react';
import { throttle } from 'lodash';

import { AppDispatch } from '@web-ui/store';
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  addNode,
} from '@web-ui/store/slices/flowsRepoSlice';

import '@xyflow/react/dist/style.css';
import { Aside } from '@web-ui/components/Aside/Aside';
import { useSocket } from '@web-ui/socket/socket';
import { DnDProvider } from '../../utils/DnDContext';

import { featchNodesThunk } from '@web-ui/store/thunks/flow/featchNodesThunk';
import { setPackages } from '@web-ui/store/slices/packagesSlice';
import { newArtifact } from '@web-ui/store/slices/artifactsSlice';
import { FlowWorkspace } from '@web-ui/components/FlowWorkspace';
import { useWebRTC } from '@web-ui/webrtc/webrtc.context';
import { setOpenedTab } from '@web-ui/store/slices/workspaceSlice';
import { openNewTabThunk } from '@web-ui/store/thunks/workspace/openNewTabThunk';

function Page() {
  const webrtc = useWebRTC();
  const socket = useSocket();
  const dispatch = useDispatch<AppDispatch>();

  const openedTab = useSelector((state: any) => state.workspace.tabs[state.workspace.openedTab]);
  const selectedFlowName = openedTab.data.flowName;

  // const flowID = useSelector((state: any) => state.session.selectedFlow);
  
  // const selectedFlowPath = flowID && useSelector((state: any) => state.flows[flowID].path);

  // const master_genworker = flowID && useSelector((state: any) => state.team.masterGenworker);

  const { getViewport } = useReactFlow();
  const [x, y, zoom] = useStore((s) => s.transform);
  
  const userId = useSelector((state: any) => state.client.userId);
  const projectId = useSelector((state: any) => state.projectRepo.projects.find((p:any) => p.name == state.projectRepo.selectedProject)?.projectId);
  
  const reactFlowRef = useRef<HTMLDivElement>(null);  
  
  const [remoteCursor, setRemoteCursor] = useState<{ x: number; y: number } | null>(null);
  const [mV, setMv] = useState(true);
  
  
  const tabs = useSelector((state: any) => state.workspace.tabs);
  const selectedTab = useSelector((state: any) => state.workspace.openedTab);

  // --------------

  useEffect(() => {
    dispatch(featchNodesThunk(webrtc))
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
        path: '',// selectedFlowPath
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
    <div className="w-full h-full flex flex-row justify-start items-start">
      <Aside tabs={['Hierarchy', 'Nodes', 'Files']} />
      <div className="flex-col w-full h-full bg-[#0F0B14]">
        {mV && remoteCursor && <div className="absolute w-4 h-4 bg-red-500 rounded-full" style={{
          top: remoteCursor.y * zoom + y + 48,
          left: remoteCursor.x * zoom + x + 270,
        }}></div>}
        <div className='border-b-2 border-br'>
          {tabs.map((tab, index) => (
            <div key={tab.title + index} onClick={() => dispatch(openNewTabThunk(index))} className={`h-8 px-4 border-b-2 flex justify-center items-center gap-2 cursor-pointer ${selectedTab === index ? 'border-primary' : 'border-gray-600'} `}>
              <div className={`justify-start text-xs font-normal font-['Inter'] leading-none ${selectedTab === index ? 'text-on_bg/80' : 'text-on_bg/50'}`}>
                {tab.title}
              </div>
            </div>
          ))}
        </div>
        {<FlowWorkspace reactFlowRef={reactFlowRef}/>}
      </div>
      <Aside tabs={['Inspector', 'Runs', 'Artifacts']} />
    </div>
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

