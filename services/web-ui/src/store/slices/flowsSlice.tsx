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
      console.log(data)
      if(!state[flowID]) {
        state[flowID] = {
          selectedNodes: [],
          selectedEdges: [],
          nodes: [],
          edges: [],
          ...data 
        };
      }
    },
    addNode: (state, action) => {
      const { flowID, node } = action.payload;
      if (!state[flowID]) { console.error("Flow not found"); return; }
      state[flowID].nodes.push(node);
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
      return initialState;
    },
    setInputValue: (
      state,
      {payload: { flowID, nodeId, inputId, value }}:PayloadAction<{ flowID: string; nodeId: string; inputId: string; value: string }>
    ) => {
      if (!state[flowID]) return;
      console.log(flowID, nodeId, inputId, value);
      // @ts-ignore
      state[flowID].nodes.filter((node) => node.id === nodeId)[0].data.inputs.filter((input: any) => input.id === inputId)[0].value = value;
    },
  }
});

export const { setFlow, onNodesChange, onEdgesChange, onConnect, setSelection, flowsSliceClear, addNode, setInputValue } = flowsSlice.actions;
export default flowsSlice.reducer;