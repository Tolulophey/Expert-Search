import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/app";
import locationReducer from "./location/location";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const locationPersistConfig = {
  key: "location",
  storage: storage,
  blacklist: ["isLoading", "error"],
};

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  blacklist: ["location"],
};

const rootReducer = combineReducers({
  app: appReducer,
  location: persistReducer(locationPersistConfig, locationReducer),
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
