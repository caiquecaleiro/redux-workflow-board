import { AppState } from "..";

const selectWorkflows = (state: AppState) => state.workflows.data;

export {
    selectWorkflows
}
