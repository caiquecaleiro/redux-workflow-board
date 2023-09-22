
import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "..";
import { Task } from "../../types/task";

const selectTasks = (state: AppState) => state.tasks.data;

const selectTasksKeyedById = createSelector(
    selectTasks,
    tasks => tasks.reduce((acc, task) => {
        acc[task.id] = task;
        return acc;
    }, {} as Record<Task['id'], Task>)
);

const selectTasksFilteredByWorkflowId = createSelector(
    [selectTasks, (_state, workflowId) => workflowId],
    (tasks, workflowId) => tasks.filter((task) => task.workflowId === workflowId)
);

export {
    selectTasks,
    selectTasksKeyedById,
    selectTasksFilteredByWorkflowId
}
