import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import flowsReducer from './slices/flowsSlice';
import clientReducer from './slices/clientSlice';
import teamSlice from './slices/teamSlice';
import projectSlice from './slices/projectSlice';
import sessionSlice from './slices/sessionSlice';
import packagesSlice from './slices/packagesSlice';
import artifactsSlice from './slices/artifactsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    session: sessionSlice,
    team: teamSlice,
    project: projectSlice,
    flows: flowsReducer,
    packages: packagesSlice,
    artifacts: artifactsSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export default store;
