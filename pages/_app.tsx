import 'antd/dist/antd.css';
import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import user from '../reducers/user';
import tweets from '../reducers/tweets';
import { AppProps } from 'next/app';

// Combine Redux reducers
const reducers = combineReducers({ user, tweets });
const persistConfig = {
  key: 'hackatweet',
  storage,
  blacklist: ['tweets'], // Prevents tweets to be stored in local storage
};

// Configure the Redux store with persistReducer
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Create the persistor for Redux Persist
const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  

  useEffect(() => {
        const user = store.getState().user.value;
        if (!user.token) {
            router.push('/'); // Redirige vers la page d'accueil si l'utilisateur n'est pas connecté
        }
    }, [router]);

   

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

export default MyApp;
