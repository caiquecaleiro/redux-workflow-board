import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { useEffect } from "react";
import { fetchWorkflows } from "../../store/thunks/workflowsThunks";
import WorkflowHeader from "../../components/WorkflowHeader";

function Board() {
    const dispatch: AppDispatch = useDispatch();

    const { isLoading, error } = useSelector((state: AppState) => state.workflows);

    useEffect(() => {
        dispatch(fetchWorkflows());
    }, [dispatch])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <>
            <WorkflowHeader />
        </>
    )
}

export default Board;
