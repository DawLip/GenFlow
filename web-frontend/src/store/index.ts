import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import flowsReducer from './slices/flowsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    flows: flowsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export default store;
