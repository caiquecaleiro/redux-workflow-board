import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { useEffect } from "react";
import { fetchWorkflows } from "../../store/workflows/thunks";
import { fetchTasks } from "../../store/tasks/thunks";
import WorkflowHeader from "../../components/WorkflowHeader";
import WorkflowColumnList from "../../components/WorkflowColumnList";

function Board() {
    const dispatch: AppDispatch = useDispatch();

    const { isLoading: workflowsIsLoading, error: workflowsError } = useSelector((state: AppState) => state.workflows);
    const { isLoading: tasksIsLoading, error: tasksError } = useSelector((state: AppState) => state.tasks);
    const isLoading = workflowsIsLoading || tasksIsLoading;
    const error = workflowsError || tasksError;

    useEffect(() => {
        dispatch(fetchWorkflows());
        dispatch(fetchTasks());
    }, [dispatch])

    // TODO: Implement loading and error states for each child component
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <div data-testid="board">
            <WorkflowHeader />
            <WorkflowColumnList />
        </div>
    )
}

export default Board;
