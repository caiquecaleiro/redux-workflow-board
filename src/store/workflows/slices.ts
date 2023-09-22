import { createSlice } from "@reduxjs/toolkit";
import { WorkflowsState } from "../../types/workflow";
import { fetchWorkflows } from "./thunks";

const initialState: WorkflowsState = {
    data: [],
    isLoading: false,
    error: null
}

const workflowsSlice = createSlice({
    name: 'workflows',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchWorkflows.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWorkflows.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchWorkflows.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    }
});

export const workflowsReducer = workflowsSlice.reducer;
