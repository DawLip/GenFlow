'use client';


import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  OnSelectionChangeParams,
  useStore
} from '@xyflow/react';
import { throttle } from 'lodash';

import { AppDispatch } from '@web-ui/store';
import {
  setSelection,
} from '@web-ui/store/slices/workspaceSlice';

import '@xyflow/react/dist/style.css';
import { useSocket } from '@web-ui/socket/socket';
import { useDnD } from '../utils/DnDContext';
import { defaultNode } from '@web-ui/store/nodes/node.default';
import { addNodeThunk } from '@web-ui/store/thunks/flow/addNodeThunk';
import { onNodesChangeThunk } from '@web-ui/store/thunks/flow/onNodesChangeThunk';
import { onEdgesChangeThunk } from '@web-ui/store/thunks/flow/onEdgesChangeThunk';
import { onConnectThunk } from '@web-ui/store/thunks/flow/onConnectThunk';

import { DefaultNode } from '@web-ui/components/node/DefaultNode';
import { useWebRTC } from '@web-ui/webrtc/webrtc.context';

export function FlowWorkspace({ reactFlowRef }: { reactFlowRef: any }) {
  const webRTC = useWebRTC();
  const dispatch = useDispatch<AppDispatch>();
  const [type, setType] = useDnD();

  const [x, y, zoom] = useStore((s) => s.transform);

  const openedTab = useSelector((state: any) => state.workspace.tabs[state.workspace.openedTab]);
  const flow = useSelector((state: any) => state.flowsRepo.flows.find((f: any) => f.name === openedTab.data.flowName && f.ProjectName === openedTab.data.ProjectName));
  const nodes = flow.data.nodes
  const edges = flow.data.edges

  const packages = useSelector((state: any) => state.packages.packages);
  
  const nodeTypes = {
    Default: DefaultNode
  };

  const nodeTypes2 = useMemo(() => {
      console.log("packages:", packages)
      if (!packages.length) return {};
      const nodes = {};
  
      packages.forEach((pkg: any) => {
        pkg.nodes.forEach((node: any) => {
          nodes[`${node.package}/${node.path}/${node.data.name}`] = node
        });
      })
  ;
      return nodes
    }, [packages]);
    console.log("nodeTypes2:", nodeTypes2)

  const onNodesChangeW = useMemo(
    () => throttle((changes: any) => {dispatch(onNodesChangeThunk({ flow: openedTab, nodes, changes }, flow.name, webRTC));}, 100),
    [dispatch, nodes],
  );

  const onEdgesChangeW = useMemo(
    () => throttle((changes: any) => {dispatch(onEdgesChangeThunk({ flow: openedTab, edges, changes }, flow.name, webRTC));}, 100),
    [dispatch, edges],
  );

  const onConnectW = useMemo(
    () =>throttle((params: any) => {dispatch(onConnectThunk({ 
      flow: openedTab, 
      edges, 
      params:{...params, id: `${params.source}.${params.sourceHandle}<->${params.target}.${params.targetHandle}`} }, 
      flow.name, webRTC));
    }, 100),
    [dispatch, edges],
  );

  const handleSelectionChange = useCallback(
    ({ nodes, edges }: OnSelectionChangeParams<Node, Edge>) => {
      const selectedNodes = nodes.map((n) => n.id);
      const selectedEdges = edges.map((e) => e.id);
      dispatch(setSelection({ selectedNodes, selectedEdges }));
    },
    [dispatch, openedTab],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!type) return;
      const t = type;
      const position = {
        x: Math.floor((event.clientX - 190-32-48 - x)/zoom/64)*64,
        y: Math.floor((event.clientY - 48 - y)/zoom/64)*64
      };
      dispatch(addNodeThunk({ 
        flow: openedTab,
        node: {
          ...defaultNode,
          // @ts-ignore
          ...nodeTypes2[t],
          style: {
            // @ts-ignore
            width: (nodeTypes2[t]?.style?.width || 2)*64,
            // @ts-ignore
            height: (nodeTypes2[t]?.style?.height || 2)*64,
          },
          id: crypto.randomUUID(),
          position
        }
      }, flow.name, webRTC));
      // @ts-ignore
      setType(null);
    },
    [type],
  );

  return (
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
  );
}
  
