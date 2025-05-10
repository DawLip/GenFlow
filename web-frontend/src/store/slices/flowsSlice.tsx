import { createSlice } from '@reduxjs/toolkit';
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import {
  FlowState
} from '@store/flow.type';

const initialState: FlowState = {
  '1': {
    flowID: '1',
    flowName: 'Flow 1',
    nodes: [
      {
        id: '1',
        type: 'textUpdater',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
      },
      {
        id: '2',
        type: 'textUpdater',
        data: { label: 'World' },
        position: { x: 64, y: 64 },
      },
    ],
    edges: [
      { id: '1-2', source: '1', sourceHandle: 'b', target: '2'},
    ],
  },
};

const flowsSlice = createSlice({
  name: 'flows',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state[action.payload.flowID] = action.payload.data;
    },
    onNodesChange: (state, action) => {
      const { flowID, nodes, changes } = action.payload;
      if(state[flowID]) state[flowID].nodes = applyNodeChanges(changes, nodes);
    },
    onEdgesChange: (state, action) => {
      const { flowID, edges, changes } = action.payload;
      if(state[flowID]) state[flowID].edges = applyEdgeChanges(changes, edges);
    },
    onConnect: (state, action) => {
      const { flowID, edges, params } = action.payload;
      if(state[flowID]) state[flowID].edges = addEdge(params, edges);
    },
  },
});

export const { setFormData, onNodesChange, onEdgesChange, onConnect } = flowsSlice.actions;
export default flowsSlice.reducer;