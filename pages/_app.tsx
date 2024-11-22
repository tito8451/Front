import 'antd/dist/antd.css';
import '../styles/globals.css';
import Head from 'next/head';

// redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';
import tweets from '../reducers/tweets';

// redux-persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { AppProps } from 'next/app'; // Import AppProps pour typer le composant

const reducers = combineReducers({ user, tweets });
const persistConfig = {
  key: 'hackatweet',
  storage,
  blacklist: ['tweets'], // Prevents tweets to be stored in local storage
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

// Typage du composant app avec AppProps
function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Hackatweet</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
