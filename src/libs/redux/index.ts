import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { AuthState, authReudcer } from "./auth/auth.reducer";
import { MessageState, messageReducer } from "./message/message.reducer";
import logger from "redux-logger";
import { ContactState, contactReducer } from "./contact/contact.reducer";
export interface RootState {
  auth: AuthState;
  message: MessageState;
  contact: ContactState;
}
const rootReducer: Reducer<RootState> = combineReducers({
  auth: authReudcer,
  message: messageReducer,
  contact: contactReducer,
});
const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth'],
};
const axiosMiddleware = (store: any) => (next: any) => (action: any) => {
  try {
    return next(action);
  } catch (error) {
    console.log("error", error);
  }
}
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(axiosMiddleware),
});

export const persistor = persistStore(store);
persistor.persist();

export type AppDispatch = typeof store.dispatch;
