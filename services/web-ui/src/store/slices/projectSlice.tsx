import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projectId: '',
    name: '',
    owner: '',
    description: '',
    flows: [],
    loading: true,
    error: null,
  },
  reducers: {
    setProject: (state, action) => {
      state.projectId = action.payload.projectId;
      state.name = action.payload.name;
      state.owner = action.payload.owner;
      state.description = action.payload.description;
      state.flows = action.payload.flows || [];
      state.loading = false;
      state.error = null;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProject, setLoading, setError } = projectSlice.actions;
export default projectSlice.reducer;