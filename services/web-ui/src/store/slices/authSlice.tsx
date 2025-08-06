import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    userId: '',
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.error = null;
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`;
    },
    logout: (state) => {
      state.token = '';
      state.userId = '';
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  authSliceClear: (state) => {
      state.token = '';
      state.userId = '';
      state.loading = false;
      state.error = null;
    }
  },
});

export const { login, logout, setLoading, setError, authSliceClear } = authSlice.actions;
export default authSlice.reducer;