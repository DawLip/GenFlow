import { createSlice } from '@reduxjs/toolkit';
import { remove } from 'lodash';

type InitialStateType = {
  teamId: string;
  name: string;
  owner: string;
  members: string[];
  projects: string[];
  masterGenworker: string | null;
  storageGenworkers: string[];
  genworkers: string[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialStateType = {
  teamId: '',
  name: '',
  owner: '',
  members: [],
  projects: [],
  masterGenworker: null,
  storageGenworkers: [],
  genworkers: [],
  loading: true,
  error: null,
}

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.teamId = action.payload.teamId;
      state.name = action.payload.name;
      state.owner = action.payload.owner;
      state.members = action.payload.members;
      state.projects = action.payload.projects;
      state.masterGenworker = action.payload.masterGenworker || null;
      state.storageGenworkers = action.payload.storageGenworkers || [];
      state.genworkers = action.payload.genworkers || [];
      state.loading = false;
      state.error = null;
    },
    addGenworkerToTeam: (state, action) => {
      if (!state.genworkers.includes(action.payload.genworkerId)) {
        state.genworkers.push(action.payload.genworkerId);
      }
    },
    removeGenworkerFromTeam: (state, action) => {
      state.genworkers = state.genworkers.filter(id => id !== action.payload.genworkerId);
    },
    setMasterGenworker: (state, action) => {
      state.masterGenworker = action.payload.genworkerId;
    },
    addGenworkerToTeamStorage: (state, action) => {
      if (!state.storageGenworkers.includes(action.payload.genworkerId)) {
        state.storageGenworkers.push(action.payload.genworkerId);
      }
    },
    removeGenworkerFromTeamStorage: (state, action) => {
      state.storageGenworkers = state.storageGenworkers.filter(id => id !== action.payload.genworkerId);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    teamSliceClear: (state) => {
      state.teamId = '';
      state.name = '';
      state.owner = '';
      state.members = [];
      state.projects = [];
      state.loading = true;
      state.error = null;
    }
  },  
});

export const { setTeam, setLoading, setError, setMasterGenworker,teamSliceClear, addGenworkerToTeam, removeGenworkerFromTeam, addGenworkerToTeamStorage, removeGenworkerFromTeamStorage } = teamSlice.actions;
export default teamSlice.reducer;