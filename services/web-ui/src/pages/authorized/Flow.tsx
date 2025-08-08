'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReactFlow,
  Controls,
  Background,
  ReactFlowProvider,
  BackgroundVariant,
  Node,
  Edge,
  OnSelectionChangeParams,
  useReactFlow,
  useStore
} from '@xyflow/react';
import { throttle } from 'lodash';

import { AppDispatch } from '@web-ui/store';
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  setSelection,
  addNode,
} from '@web-ui/store/slices/flowsSlice';

import '@xyflow/react/dist/style.css';
import { DefaultNode } from '@web-ui/components/node/DefaultNode';
import { Aside } from '@web-ui/components/Aside/Aside';
import { useSocket } from '@web-ui/socket/socket';
import { DnDProvider, useDnD } from '../../utils/DnDContext';
import { defaultNode } from '@web-ui/store/node.default';
import { addNodeThunk } from '@web-ui/store/thunks/flow/addNodeThunk';
import { onNodesChangeThunk } from '@web-ui/store/thunks/flow/onNodesChangeThunk';
import { onEdgesChangeThunk } from '@web-ui/store/thunks/flow/onEdgesChangeThunk';
import { onConnectThunk } from '@web-ui/store/thunks/flow/onConnectThunk';

const nodeTypes = {
  default: DefaultNode,
};

function Page() {
  const socket = useSocket();
  const dispatch = useDispatch<AppDispatch>();

  const flowID = useSelector((state: any) => state.session.selectedFlow);
  const nodes = useSelector((state: any) => state.flows[flowID].nodes);
  const edges = useSelector((state: any) => state.flows[flowID].edges);
  const selectedFlowName = useSelector((state: any) => state.flows[flowID].name);
  
  const [type, setType] = useDnD();
  const { getViewport } = useReactFlow();
  const [x, y, zoom] = useStore((s) => s.transform);
  
  const userId = useSelector((state: any) => state.client.userId);
  const projectId = useSelector((state: any) => state.project.projectId);
  
  const reactFlowRef = useRef<HTMLDivElement>(null);  
  
  const [remoteCursor, setRemoteCursor] = useState<{ x: number; y: number } | null>(null);
  const [mV, setMv] = useState(true);
  
  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      const { x, y, zoom } = getViewport();
      const rect = reactFlowRef.current?.getBoundingClientRect();
      if (!rect) return;

      socket?.emit('flow_mouse_move',{
        userId, 
        projectId, 
        flowName: selectedFlowName,
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
  }, [socket]);

  const onNodesChangeW = useMemo(
    () =>throttle((changes: any) => {dispatch(onNodesChangeThunk({ flowID, nodes, changes }, socket));}, 100),
    [dispatch, nodes],
  );

  const onEdgesChangeW = useMemo(
    () => throttle((changes: any) => {dispatch(onEdgesChangeThunk({ flowID, edges, changes }, socket));}, 100),
    [dispatch, edges],
  );

  const onConnectW = useMemo(
    () =>throttle((params: any) => {dispatch(onConnectThunk({ flowID, edges, params }, socket));}, 100),
    [dispatch, edges],
  );

  const handleSelectionChange = useCallback(
    ({ nodes }: OnSelectionChangeParams<Node, Edge>) => {
      const selectedIds = nodes.map((n) => n.id);
      dispatch(setSelection({ flowID, selectedNodesIDs: selectedIds }));
    },
    [dispatch, flowID],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!type) return;
      console.log("x, y, zoom",x,y, zoom, )
      const position = {
        x: Math.floor((event.clientX - 190-32-48 - x)/zoom/64)*64,
        y: Math.floor((event.clientY - 48 - y)/zoom/64)*64
      };
      console.log(position.x, position.y)
      dispatch(addNodeThunk({ flowID, node: {...defaultNode, id: crypto.randomUUID(), position} }, socket));
      // @ts-ignore
      setType(null);
    },
    [type],
  );

  return (
    <>
      <Aside tabs={['Hierarchy', 'Nodes', 'Files']} />
      <div className="w-full h-full bg-[#0F0B14]">
        {mV && remoteCursor && <div className="absolute w-4 h-4 bg-red-500 rounded-full" style={{
          top: remoteCursor.y * zoom + y + 48,
          left: remoteCursor.x * zoom + x + 270,
        }}></div>}
        <ReactFlow
          ref={reactFlowRef}
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeW}
          onEdgesChange={onEdgesChangeW}
          onConnect={onConnectW}
          onSelectionChange={handleSelectionChange}
          onDrop={onDrop}
          onDragOver={onDragOver}
          snapToGrid
          snapGrid={[64, 64]}
          minZoom={0.01}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <Background
            id="1"
            offset={[64, 64]}
            gap={64}
            size={1}
            color="#F1E7FE"
            variant={BackgroundVariant.Dots}
          />
          <Controls />
        </ReactFlow>
      </div>
      <Aside tabs={['Inspector', 'Runs', 'Viewer']} />
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

