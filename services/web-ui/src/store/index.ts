import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import flowsReducer from './slices/flowsSlice';
import clientReducer from './slices/clientSlice';
import teamSlice from './slices/teamSlice';
import projectSlice from './slices/projectSlice';
import sessionSlice from './slices/sessionSlice';
import packagesSlice from './slices/packagesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    flows: flowsReducer,
    packages: packagesSlice,
    client: clientReducer,
    team: teamSlice,
    project: projectSlice,
    session: sessionSlice,

  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export default store;
