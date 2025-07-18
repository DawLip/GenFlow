import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import flowsReducer from './slices/flowsSlice';
import clientReducer from './slices/clientSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    flows: flowsReducer,
    client: clientReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export default store;
