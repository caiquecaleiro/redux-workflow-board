import { configureStore } from "@reduxjs/toolkit";
import { workflowsReducer } from "./workflows/slices";
import { tasksReducer } from "./tasks/slices";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        workflows: workflowsReducer,
    }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
