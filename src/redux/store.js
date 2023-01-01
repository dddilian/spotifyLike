//simple setter function comming from @reduxjs/toolkit
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";

import { shazamFreeApi } from "./services/shazamFree";
import { shazamSecondFreeApi } from "./services/shazamSecondFree";

export const store = configureStore({
  reducer: {
    [shazamFreeApi.reducerPath]: shazamFreeApi.reducer,
    player: playerReducer,
    [shazamSecondFreeApi.reducerPath]: shazamSecondFreeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamFreeApi.middleware, shazamSecondFreeApi.middleware),
});
