import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for persistence
import authReducer from '../features/auth/auth-slice';

const persistConfig = {
  key: 'auth', // Key for the persisted state
  storage, // Use localStorage
  whitelist: ['auth'], // Persist only the auth slice
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

export const persistor = persistStore(store);