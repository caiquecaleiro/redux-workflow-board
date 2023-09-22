import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
    try {
        const response = await axios.get('http://localhost:3005/tasks');

        return response.data;
    } catch (error) {
        throw new Error('Error fetching tasks: ' + error);
    }
});

export {
    fetchTasks
};
