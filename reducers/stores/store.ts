// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../user';
import tweetsReducer from '../tweets';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tweets: tweetsReducer,
  },
});

// Définir le type de l'état global
export type RootState = ReturnType<typeof store.getState>;

// Export le type de dispatch pour l'utiliser ensuite
export type AppDispatch = typeof store.dispatch;
