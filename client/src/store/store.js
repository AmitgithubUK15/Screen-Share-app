import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import Userslice from './User/UserSlice'

const rootreducer = combineReducers({
  user:Userslice
})

const persistConfig = {
    key : 'root',
    storage,
    blacklist:[],

}

const persisterReducer = persistReducer(persistConfig,rootreducer);

export const store = configureStore({
    reducer:persisterReducer,
    middleware:( getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false,
    })
})

export const persistor = persistStore(store);