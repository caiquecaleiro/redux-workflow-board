import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit";
import { workflowsReducer } from "./workflows/slices";
import { tasksReducer } from "./tasks/slices";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    workflows: workflowsReducer,
})

export function setupStore(preloadedState?: PreloadedState<AppState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
