import { createSlice } from '@reduxjs/toolkit';
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
    projectSliceClear: (state) => {
      state = initialState;
    }
  },
});

export const { onConnect,onEdgesChange, onNodesChange, setLoading, setError, projectSliceClear, setFlow, addNode } = flowsRepoSlice.actions;
export default flowsRepoSlice.reducer;