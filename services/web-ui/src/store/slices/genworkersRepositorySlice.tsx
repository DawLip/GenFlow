import { createSlice } from '@reduxjs/toolkit';

interface GenworkersState {
  genworkers: any;
  loading: boolean;
  error: string | null;
}

const initialState: GenworkersState = {
  genworkers: {},
  loading: true,
  error: null,
};

const genworkersRepositorySlice = createSlice({
  name: 'genworkersRepository',
  initialState,
  reducers: {
    newGenworker: (state, action) => {
      state.genworkers[action.payload.id] = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    genworkersSliceClear: (state) => {
      state.genworkers = {};
      state.loading = true;
      state.error = null;
    }
  },
});

export const { setLoading, setError, genworkersSliceClear, newGenworker } = genworkersRepositorySlice.actions;
export default genworkersRepositorySlice.reducer;