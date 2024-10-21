import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import Userslice from './User/UserSlice'
import errorSlice from './ErrorHandle/ErrorSlice'

const rootreducer = combineReducers({
  user:Userslice,
  error:errorSlice
})

const persistConfig = {
    key : 'root',
    storage,
    blacklist:['error'],
}

const persisterReducer = persistReducer(persistConfig,rootreducer);

export const store = configureStore({
    reducer:persisterReducer,
    middleware:( getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    })
})

export const persistor = persistStore(store);