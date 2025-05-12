import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { applyNodeChanges, applyEdgeChanges, addEdge, Edge } from '@xyflow/react';
import {
  FlowState
} from '@store/flow.type';

const initialState: FlowState = {
  '1': {
    flowID: '1',
    flowName: 'Flow 1',
    selectedNodes: [],
    selectedEdges: [],
    nodes: [
      {
        id: 'node-1',
        type: 'textUpdater',
        data: { name: 'Hello', label: 'hello' },
        position: { x: 0, y: 0 },
      },
      {
        id: 'node-2',
        type: 'textUpdater',
        data: { name: 'World', label: 'world' },
        position: { x: 64, y: 64 },
      },
    ],
    edges: [
      { id: 'node-1-node-2', source: 'node-1', sourceHandle: 'b', target: 'node-2'},
    ],
  },
};

const flowsSlice = createSlice({
  name: 'flows',
  initialState,
  reducers: {
    setFormData: (state, {payload:{flowID, data}}) => {
      state[flowID] = data;
    },
    onNodesChange: (state, {payload:{flowID, nodes, changes}}) => {
      if(state[flowID]) state[flowID].nodes = applyNodeChanges(changes, nodes);
    },
    onEdgesChange: (state, {payload:{flowID, edges, changes}}) => {
      if(state[flowID]) state[flowID].edges = applyEdgeChanges(changes, edges);
    },
    onConnect: (state, {payload:{flowID, edges, params}}) => {
      if(state[flowID]) state[flowID].edges = addEdge(params, edges);
    },

    setSelection: (
      state,
      {
        payload: { flowID, selectedNodesIDs },
      }: PayloadAction<{ flowID: string; selectedNodesIDs: string[] }>
    ) => {
      if (!state[flowID]) return;
    
      state[flowID].nodes = state[flowID].nodes.map((node) => ({
        ...node,
        selected: selectedNodesIDs.includes(node.id),
      }));
    
      state[flowID].selectedNodes = state[flowID].nodes.filter((node) => selectedNodesIDs.includes(node.id));
    }
  },
});

export const { setFormData, onNodesChange, onEdgesChange, onConnect, setSelection } = flowsSlice.actions;
export default flowsSlice.reducer;