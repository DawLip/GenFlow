'use client';

import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ReactFlow,
  Controls,
  Background,
  Handle,
  Position, BackgroundVariant
} from '@xyflow/react';
import { throttle } from 'lodash';

import { AppDispatch } from '@/src/store';
import { onNodesChange, onEdgesChange, onConnect } from '@/src/store/slices/flowsSlice';

import '@xyflow/react/dist/style.css';

const TextUpdaterNode = React.memo(function TextUpdaterNode({ data }: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="bg-white p-2 border rounded">
      <Handle type="target" position={Position.Top} />
      <label htmlFor="text">Text:</label>
      <input id="text" name="text" defaultValue={data.label} onChange={onChange} className="nodrag" />
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={{ left: 10 }} />
    </div>
  );
});

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

function Page() {
  const dispatch = useDispatch<AppDispatch>();
  
  const nodes = useSelector((state: any) => state.flows['1'].nodes);
  const edges = useSelector((state: any) => state.flows['1'].edges);

  const onNodesChangeW = useMemo(
    () => throttle((changes: any) => { 
      dispatch(onNodesChange({ flowID: '1', nodes, changes })); 
    }, 100),
    [dispatch, nodes]
  );

  const onEdgesChangeW = useMemo(
    () => throttle((changes: any) => {
      dispatch(onEdgesChange({ flowID: '1', edges, changes }));
    }, 100),
    [dispatch, edges]
  );
  
  const onConnectW = useMemo(
    () => throttle((params: any) => {
      dispatch(onConnect({ flowID: '1', edges, params }));
    }, 100),
    [dispatch, edges]
  );

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeW}
        onEdgesChange={onEdgesChangeW}
        onConnect={onConnectW}
        snapToGrid={true}
        snapGrid={[64, 64]}
        fitView
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
