import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';

interface FlowRepoState {
  flows: Flow[];
  loading: boolean;
  error: any;
}

interface Flow {
  name: string;
  projectName: string;
  description: string;
  data:{
    nodes: any[];
    edges: any[];
  }
}

const initialState: FlowRepoState = {
  flows: [],
  loading: false,
  error: null,
};

const flowsRepoSlice = createSlice({
  name: 'flowsRepo',
  initialState,
  reducers: {
    setFlow: (state, action) => {
      const flow = state.flows.find((f) => f.name === action.payload.name && f.projectName === action.payload.projectName);
      
      if (flow) Object.assign(flow, {...flow, ...action.payload });
      else state.flows = [...state.flows, action.payload];

      return state;
    },
    addNode: (state, action) => {
      console.log('=== addNode reducer ===', action.payload);
      const flow = state.flows.find((f) => f.name === action.payload.flow.data.flowName && f.projectName === action.payload.flow.data.projectName);
      if (flow) flow.data.nodes.push(action.payload.node);
      
      return state;
    },
    onNodesChange: (state, action) => {
      console.log('=== onNodesChange reducer ===', action.payload);
      const flow = state.flows.find((f) => f.name === action.payload.flow.data.flowName && f.projectName === action.payload.flow.data.projectName);
      console.log('flow:', flow);
      if (flow) flow.data.nodes = applyNodeChanges(action.payload.changes, structuredClone(action.payload.nodes));
    },
    onEdgesChange: (state, action) => {
      console.log('=== onEdgesChange reducer ===', action.payload);
      const flow = state.flows.find((f) => f.name === action.payload.flow.data.flowName && f.projectName === action.payload.flow.data.projectName);
      if (flow) flow.data.edges = applyEdgeChanges(action.payload.changes, structuredClone(action.payload.edges));
    },
    onConnect: (state, action) => {
      console.log('=== onConnect reducer ===', action.payload);
      const flow = state.flows.find((f) => f.name === action.payload.flow.data.flowName && f.projectName === action.payload.flow.data.projectName);
      console.log('flow:', flow);
      if (flow) flow.data.edges = addEdge(action.payload.params, structuredClone(action.payload.edges));
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    flowsSliceClear: (state) => {
      state = initialState;
    },
    setInputValue: (state, action) => {
      const flow = state.flows.find((f) => f.name === action.payload.flowName && f.projectName === action.payload.projectName);

      console.log('=== setInputValue reducer ===', action.payload, flow);
      if (!flow) return;
      // @ts-ignore
      flow.data.nodes
        .filter((node) => node.id === action.payload.nodeId)[0].data.inputs
        .filter((input: any) => input.id === action.payload.inputId)[0].value = action.payload.value;
      return state
    },
  //   setSelection: (
  //     state,
  //     {payload: { flowName, selectedNodes }}:PayloadAction<{ flowName: string; selectedNodes: string[] }>
  //   ) => {
  //     const flow = state.flows.find((f) => f.name === flowName);
  //     console.log('=== setSelection reducer ===', flowName, selectedNodes, flow);
  //     if (!flow) return;

  //     flow.data.nodes = flow.data.nodes.map((node) => ({
  //       ...node,
  //       selected: selectedNodes.includes(node.id),
  //     }));
  //   },
  },
});

export const { setInputValue, onConnect,onEdgesChange, onNodesChange, setLoading, setError, flowsSliceClear, setFlow, addNode } = flowsRepoSlice.actions;
export default flowsRepoSlice.reducer;