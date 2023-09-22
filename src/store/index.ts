import { configureStore } from "@reduxjs/toolkit";
import { workflowsReducer } from "./slices/workflows";

export const store = configureStore({
    reducer: {
        workflows: workflowsReducer,
    }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
