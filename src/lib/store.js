import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { activityApi } from "./reducer/activityApi";
import { todosApi } from "./reducer/todosApi";

export const store = configureStore({
  reducer: {
    [activityApi.reducerPath]: activityApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(activityApi.middleware, todosApi.middleware),
});

setupListeners(store.dispatch);
