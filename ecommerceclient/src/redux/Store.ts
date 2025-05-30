import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, signupReducer } from "./Slices";
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer: {
        signupReducer,
        cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch