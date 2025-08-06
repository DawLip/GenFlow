'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReactFlow,
  Controls,
  Background,
  ReactFlowProvider,
  Handle,
  Position,
  BackgroundVariant,
  Node,
  Edge,
  OnSelectionChangeParams,
  NodeResizer,
  useReactFlow,
  useNodesState,
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
import { randomUUID } from 'crypto';

const nodeTypes = {
  default: DefaultNode,
};

function Page() {
  const socket = useSocket();
  const dispatch = useDispatch<AppDispatch>();

  const flowID = useSelector((state: any) => state.session.selectedFlow);
  const nodes = useSelector((state: any) => state.flows[flowID].nodes);
  const edges = useSelector((state: any) => state.flows[flowID].edges);

  const [type, setType] = useDnD();

  useEffect(() => {
    if (!socket) return;

    socket?.on('connect', () => {
      console.log('[SOCKET] Socket connected');
    });
  }, [socket]);

  const onNodesChangeW = useMemo(
    () =>
      throttle((changes: any) => {
        dispatch(onNodesChange({ flowID, nodes, changes }));
      }, 100),
    [dispatch, nodes],
  );

  const onEdgesChangeW = useMemo(
    () =>
      throttle((changes: any) => {
        dispatch(onEdgesChange({ flowID, edges, changes }));
      }, 100),
    [dispatch, edges],
  );

  const onConnectW = useMemo(
    () =>
      throttle((params: any) => {
        dispatch(onConnect({ flowID, edges, params }));
      }, 100),
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
      console.log('drop', type);

      event.preventDefault();

      if (!type) return;

      const position = {
        x: event.clientX,
        y: event.clientY,
      };

      dispatch(addNode({ flowID, node: {...defaultNode, id: crypto.randomUUID()} }));
      // @ts-ignore
      setType(null);
    },
    [type],
  );

  return (
    <>
      <Aside tabs={['Hierarchy', 'Nodes', 'Files']} />
      <div className="w-full h-full bg-[#0F0B14]">
        <ReactFlow
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
