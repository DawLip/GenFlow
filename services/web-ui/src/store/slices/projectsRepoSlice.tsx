import { createSlice } from '@reduxjs/toolkit';

interface ProjectRepoState {
  projects: Project[];
  selectedProject: string | null;
  loading: boolean;
  error: any;
}

interface Project {
  name: string;
  isLoaded: boolean;
}

const initialState: ProjectRepoState = {
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,
};

const projectRepoSlice = createSlice({
  name: 'projectRepo',
  initialState,
  reducers: {
    setProjectsList: (state, action) => {
      state.projects = [...state.projects, ...action.payload.map((project) => ({
        ...project,
        isLoaded: false,
      }))];
      state.loading = false;
      state.error = null;
    },
    setProject: (state, action) => {
      const project = state.projects.find((p) => p.name === action.payload.name);
      if (project) Object.assign(project, {...project, ...action.payload });
      else state.projects = [...state.projects, action.payload];
      
      return state;
    },
    selectProject: (state, action) => {
      state.selectedProject = action.payload;
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

export const { setProjectsList, setLoading, setError, projectSliceClear, selectProject, setProject } = projectRepoSlice.actions;
export default projectRepoSlice.reducer;