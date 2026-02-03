import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';
import teamSlice from './slices/teamSlice';
import sessionSlice from './slices/sessionSlice';
import packagesSlice from './slices/packagesSlice';
import artifactsSlice from './slices/artifactsSlice';
import projectRepoSlice from './slices/projectsRepoSlice';
import genworkersRepoSlice from './slices/genworkersRepoSlice';
import flowsRepoSlice from './slices/flowsRepoSlice';
import workspaceSlice from './slices/workspaceSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    session: sessionSlice,
    team: teamSlice,

    packages: packagesSlice,
    artifacts: artifactsSlice,
    projectRepo: projectRepoSlice,
    flowsRepo: flowsRepoSlice,
    genworkersRepo: genworkersRepoSlice,
    workspace: workspaceSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export default store;
