import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    userId: '',
    email: '',
    username: '',
    emailConfirmed: false,
    confirmCode: '',
    genworkers: [],
    loading: true,
    error: null,
  },
  reducers: {
    setClient: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.emailConfirmed = action.payload.emailConfirmed;
      state.genworkers = action.payload.genWorkers
      state.loading = false;
      state.error = null;
    },
    confirmEmail: (state, action) => {
      state.emailConfirmed = true;
      state.confirmCode = '';
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clientSliceClear: (state) => {
      state.userId = '';
      state.email = '';
      state.username = '';
      state.emailConfirmed = false;
      state.confirmCode = '';
      state.loading = true;
      state.error = null;
    }
  },
});

export const { setClient, setLoading, setError, confirmEmail, clientSliceClear } = clientSlice.actions;
export default clientSlice.reducer;