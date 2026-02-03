import { createSlice } from '@reduxjs/toolkit';

interface ArtifactsState {
  artifacts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ArtifactsState = {
  artifacts: [],
  loading: true,
  error: null,
};

const artifactsSlice = createSlice({
  name: 'artifacts',
  initialState,
  reducers: {
    newArtifact: (state, action) => {
      state.artifacts.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    artifactsSliceClear: (state) => {
      state.artifacts = [];
      state.loading = true;
      state.error = null;
    }
  },
});

export const { setLoading, setError, artifactsSliceClear, newArtifact } = artifactsSlice.actions;
export default artifactsSlice.reducer;