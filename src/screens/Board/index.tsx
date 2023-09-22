import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { useEffect } from "react";
import { fetchWorkflows } from "../../store/thunks/workflowsThunks";

function Board() {
    const dispatch: AppDispatch = useDispatch();

    const { data, isLoading, error } = useSelector((state: AppState) => state.workflows);

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
        <div className="board">
            <h1>{data.length}</h1>
        </div>
    )
}

export default Board;
