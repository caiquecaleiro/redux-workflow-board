import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchWorkflows = createAsyncThunk('workflows/fetch', async () => {
    try {
        const response = await axios.get('http://localhost:3005/workflows');

        return response.data;
    } catch (error) {
        throw new Error('Error fetching workflows: ' + error);
    }
});

export {
    fetchWorkflows
};
