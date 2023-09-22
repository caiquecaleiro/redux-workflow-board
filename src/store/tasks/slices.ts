import { createSlice } from "@reduxjs/toolkit";
import { TasksState } from "../../types/task";
import { fetchTasks } from "./thunks";

const initialState: TasksState = {
    data: [],
    isLoading: false,
    error: null
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    }
});

export const tasksReducer = tasksSlice.reducer;
