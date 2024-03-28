import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";

const persistConfig = {
    key: "root",
    storage,
}

const PersistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer: PersistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export const PersistedStore = persistStore(Store)