import { Action, Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
// import logger from 'redux-logger';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { authReudcer } from "./auth/auth.reducer";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { messageReducer } from "./message/message.reducer";
const rootReducer = combineReducers({
  auth: authReudcer,
  message: messageReducer
});
const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: hardSet,
  whitelist: ['auth'],
  blacklist: ['message']
};
export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer<RootState, Action>);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
// persistor.purge();

export type AppDispatch = typeof store.dispatch;
