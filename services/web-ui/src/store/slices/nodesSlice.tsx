import { createSlice } from '@reduxjs/toolkit';

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: {
    nodes: {},
    loading: true,
    error: null,
  },
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    nodesSliceClear: (state) => {
      state.nodes = {};
      state.loading = true;
      state.error = null;
    }
  },
});

export const { setNodes, setLoading, setError, nodesSliceClear } = nodesSlice.actions;
export default nodesSlice.reducer;