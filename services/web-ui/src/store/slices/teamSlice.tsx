import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teamId: '',
    name: '',
    owner: '',
    members: [],
    projects: [],
    loading: true,
    error: null,
  },
  reducers: {
    setTeam: (state, action) => {
      state.teamId = action.payload.userId;
      state.name = action.payload.name;
      state.owner = action.payload.owner;
      state.members = action.payload.members;
      state.projects = action.payload.projects;
      state.loading = false;
      state.error = null;
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

export const { setTeam, setLoading, setError, teamSliceClear } = teamSlice.actions;
export default teamSlice.reducer;