import { createSlice } from '@reduxjs/toolkit';

interface ProjectRepoState {
  projects: Project[];
  loading: boolean;
  error: any;
}

interface Project {
  projectId: string;
  name: string;
  owner: string;
  description: string;
  flows: any[]; 
}

const initialState: ProjectRepoState = {
  projects: [],
  loading: true,
  error: null,
};

const projectRepoSlice = createSlice({
  name: 'projectRepo',
  initialState,
  reducers: {
    newProject: (state, action) => {
      state[action.payload.projectId].projectId = action.payload.projectId;
      state[action.payload.projectId].name = action.payload.name;
      state[action.payload.projectId].owner = action.payload.owner;
      state[action.payload.projectId].description = action.payload.description;
      state[action.payload.projectId].flows = action.payload.flows || [];
      state.loading = false;
      state.error = null;
    },

    // newFlow: (state, action) => {
    //   state.flows = [...state.flows, action.payload];
    // },

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

export const { newProject, setLoading, setError, projectSliceClear } = projectRepoSlice.actions;
export default projectRepoSlice.reducer;