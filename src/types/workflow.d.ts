export interface Workflow {
    id: number;
    name: string;
}

export interface WorkflowsState {
    data: Workflow[],
    error?: SerializedError | null;
    isLoading: boolean;
}
