import { configureStore } from "@reduxjs/toolkit";
import { propertyDetailsApi } from "./Services/PropertyDetails";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [propertyDetailsApi.reducerPath]: propertyDetailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            propertyDetailsApi.middleware
        ]),
});

setupListeners(store.dispatch);