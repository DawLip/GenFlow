import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { applyNodeChanges, applyEdgeChanges, addEdge, Edge } from '@xyflow/react';
import {
  FlowState
} from '@web-ui/store/flow.type';

const initialState: FlowState = {};

const flowsSlice = createSlice({
  name: 'flows',
  initialState,
  reducers: {
    setFlow: (state, {payload:{flowID, data}}) => {
      state[flowID] = data;
    },
    onNodesChange: (state, {payload:{flowID, nodes, changes}}) => {
      if(state[flowID]) state[flowID].nodes = applyNodeChanges(changes, structuredClone(nodes));
    },
    onEdgesChange: (state, {payload:{flowID, edges, changes}}) => {
      if(state[flowID]) state[flowID].edges = applyEdgeChanges(changes, edges);
    },
    onConnect: (state, {payload:{flowID, edges, params}}) => {
      if(state[flowID]) state[flowID].edges = addEdge(params, edges);
    },

    setSelection: (
      state,
      {payload: { flowID, selectedNodesIDs }}:PayloadAction<{ flowID: string; selectedNodesIDs: string[] }>
    ) => {
      if (!state[flowID]) return;
    
      state[flowID].nodes = state[flowID].nodes.map((node) => ({
        ...node,
        selected: selectedNodesIDs.includes(node.id),
      }));
    
      state[flowID].selectedNodes = state[flowID].nodes.filter((node) => selectedNodesIDs.includes(node.id));
    },
    flowsSliceClear: (state) => {
      return {};
    }
  }
});

export const { setFlow, onNodesChange, onEdgesChange, onConnect, setSelection, flowsSliceClear } = flowsSlice.actions;
export default flowsSlice.reducer;