import { createSlice } from '@reduxjs/toolkit';

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
    nodes: [any];
    edges: [any];
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

export const { setLoading, setError, projectSliceClear, setFlow } = flowsRepoSlice.actions;
export default flowsRepoSlice.reducer;