import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedFlow: null,
    loading: false,
    error: null,
  }

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    selectFlow: (state, action) => {
      state.selectedFlow = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    sessionSliceClear: (state) => {
      return initialState;
    }
  },
});

export const { selectFlow, setLoading, setError, sessionSliceClear } = sessionSlice.actions;
export default sessionSlice.reducer;