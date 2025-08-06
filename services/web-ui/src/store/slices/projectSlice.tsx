import { createSlice } from '@reduxjs/toolkit';

interface ProjectState {
  projectId: string;
  name: string;
  owner: string;
  description: string;
  flows: any[]; 
  loading: boolean;
  error: any;
}

const initialState: ProjectState = {
  projectId: '',
  name: '',
  owner: '',
  description: '',
  flows: [],
  loading: true,
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
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

    newFlow: (state, action) => {
      state.flows = [...state.flows, action.payload];
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    projectSliceClear: (state) => {
      state.projectId = '';
      state.name = '';
      state.owner = '';
      state.description = '';
      state.flows = [];
      state.loading = true;
      state.error = null;
    }
  },
});

export const { setProject, setLoading, setError, projectSliceClear, newFlow } = projectSlice.actions;
export default projectSlice.reducer;