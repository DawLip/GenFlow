import { createSlice } from '@reduxjs/toolkit';

interface Tab {
  title: string;
  type: string;
  data: any;
}

interface WorkspaceState {
  tabs: Tab[];
  openedTab: number;
  loading: boolean;
  error: string | null;
}

const initialState: WorkspaceState = {
  tabs: [],
  openedTab: 0,
  loading: true,
  error: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    newTab: (state, action) => {
      state.tabs = [...state.tabs, action.payload];
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    workspaceSliceClear: (state) => {
      state.tabs = [];
      state.loading = true;
      state.error = null;
    }
  },
});

export const { setLoading, setError, workspaceSliceClear, newTab } = workspaceSlice.actions;
export default workspaceSlice.reducer;