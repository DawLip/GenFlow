'use client';

import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReactFlow,
  Controls,
  Background,
  Handle,
  Position, BackgroundVariant, Node, Edge, OnSelectionChangeParams,
  NodeResizer
} from '@xyflow/react';
import { throttle } from 'lodash';

import { AppDispatch } from '@/src/store';
import { onNodesChange, onEdgesChange, onConnect, setSelection } from '@/src/store/slices/flowsSlice';

import '@xyflow/react/dist/style.css';

const TextUpdaterNode = React.memo(function TextUpdaterNode(node: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div
      style={{ width: node.style?.width, height: node.style?.height }}
      className={`grow flex-col overflow-hidden p-2 border rounded ${
        node.selected ? 'border-primary/40' : ''
      }`}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={node.selected}
        minWidth={64}
        minHeight={64}
      />
      <Handle type="target" position={Position.Top} />
      <div className="flex-1 w-full">
        <label htmlFor={`${node.id}-text`}>Text:</label>
        <input
          id={`${node.id}-text`}
          name="text"
          defaultValue={node.data.label}
          onChange={onChange}
          className="nodrag w-full"
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={{ left: 10 }} />
    </div>
  );
});

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

function Page() {
  const flowID = '1';
  const dispatch = useDispatch<AppDispatch>();

  const nodes = useSelector((state: any) => state.flows[flowID].nodes);
  const edges = useSelector((state: any) => state.flows[flowID].edges);

  const onNodesChangeW = useMemo(
    () => throttle((changes: any) => {
      dispatch(onNodesChange({ flowID, nodes, changes }));
    }, 100),
    [dispatch, nodes]
  );

  const onEdgesChangeW = useMemo(
    () => throttle((changes: any) => {
      dispatch(onEdgesChange({ flowID, edges, changes }));
    }, 100),
    [dispatch, edges]
  );

  const onConnectW = useMemo(
    () => throttle((params: any) => {
      dispatch(onConnect({ flowID, edges, params }));
    }, 100),
    [dispatch, edges]
  );

  const handleSelectionChange = useCallback(
    ({ nodes }: OnSelectionChangeParams<Node, Edge>) => {
      const selectedIds = nodes.map((n) => n.id);
      dispatch(setSelection({ flowID, selectedNodesIDs: selectedIds }));
    },
    [dispatch, flowID]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}

        onNodesChange={onNodesChangeW}
        onEdgesChange={onEdgesChangeW}
        onConnect={onConnectW}
        onSelectionChange={handleSelectionChange}

        snapToGrid
        snapGrid={[64, 64]}

        fitView
        minZoom={0.01}
      >
        <Background
          id="1"
          gap={64}
          color="#f1f1f1"
          variant={BackgroundVariant.Lines}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Page;
