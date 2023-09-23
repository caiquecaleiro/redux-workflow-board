import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "../../types/task";

const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
    try {
        const response = await axios.get('http://localhost:3005/tasks');

        return response.data;
    } catch (error) {
        throw new Error('Error fetching tasks: ' + error);
    }
});

const updateTask = createAsyncThunk('tasks/update', async ({ id, ...task }: Task) => {
    try {
        const response = await axios.put(`http://localhost:3005/tasks/${id}`, task);

        return response.data;
    } catch (error) {
        throw new Error('Error updating task: ' + error);
    }
});

export {
    fetchTasks,
    updateTask
};
