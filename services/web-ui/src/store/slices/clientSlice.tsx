import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    userId: '',
    email: '',
    username: '',
    emailConfirmed: false,
    confirmCode: '',
    loading: true,
    error: null,
  },
  reducers: {
    setClient: (state, action) => {
      console.log("test");
      console.log("Setting client data:", action.payload);
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.emailConfirmed = action.payload.emailConfirmed;
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

export const { setClient, setLoading, setError } = clientSlice.actions;
export default clientSlice.reducer;