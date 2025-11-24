import { createSlice } from '@reduxjs/toolkit';

interface Tab {
  title: string;
  type: string;
  data: any;
}

interface WorkspaceState {
  tabs: Tab[];
  openedTab: number;
  selectedNodes: any[];
  selectedEdges: any[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkspaceState = {
  tabs: [],
  openedTab: 0,
  selectedNodes: [],
  selectedEdges: [],
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
    setSelection: (state, action) => {
      state.selectedNodes = action.payload.selectedNodes;
      state.selectedEdges = action.payload.selectedEdges;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    workspaceSliceClear: (state) => {
      state.tabs = [];
      state.openedTab = 0;
      state.loading = true;
      state.error = null;
    }
  },
});

export const { setLoading, setSelection, setError, workspaceSliceClear, newTab } = workspaceSlice.actions;
export default workspaceSlice.reducer;