import { TaskTypes } from "./taskTypes";
import { Workflow } from "./workflow";

export interface Task {
    id: number;
    title: string;
    workflowId: Workflow['id'];
    estimationPoints: number;
    taskTypeId: TaskTypes['id'];
}

export interface TasksState {
    data: Task[],
    error?: null | SerializedError;
    isLoading: boolean;
}
