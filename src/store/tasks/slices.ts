import { createSlice } from "@reduxjs/toolkit";
import { TasksState } from "../../types/task";
import { fetchTasks, updateTask } from "./thunks";

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
        // Fetch tasks
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
        // Update task
        builder
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const { id } = action.payload;
                const taskIndex = state.data.findIndex((task) => task.id === id);

                if (taskIndex !== -1) {
                    state.data[taskIndex] = action.payload;
                }

                state.isLoading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    }
});

export const tasksReducer = tasksSlice.reducer;
