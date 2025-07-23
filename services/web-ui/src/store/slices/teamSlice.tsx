import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teamId: '',
    name: '',
    owner: '',
    members: [],
    loading: true,
    error: null,
  },
  reducers: {
    setTeam: (state, action) => {
      state.teamId = action.payload.userId;
      state.name = action.payload.name;
      state.owner = action.payload.owner;
      state.members = action.payload.members;
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

export const { setTeam, setLoading, setError } = teamSlice.actions;
export default teamSlice.reducer;