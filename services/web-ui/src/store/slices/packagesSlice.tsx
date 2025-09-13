import { createSlice } from '@reduxjs/toolkit';

const packagesSlice = createSlice({
  name: 'packages',
  initialState: {
    packages: [],
    loading: true,
    error: null,
  },
  reducers: {
    setPackages: (state, action) => {
      state.packages = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    packagesSliceClear: (state) => {
      state.packages = [];
      state.loading = true;
      state.error = null;
    }
  },
});

export const { setPackages, setLoading, setError, packagesSliceClear } = packagesSlice.actions;
export default packagesSlice.reducer;