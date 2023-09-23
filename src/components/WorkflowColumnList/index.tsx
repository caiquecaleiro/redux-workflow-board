import { useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { AppDispatch } from '../../store';
import WorkflowColumn from '../WorkflowColumn';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/tasks/thunks';
import { selectWorkflows } from '../../store/workflows/selectors';
import { selectTasksKeyedById } from '../../store/tasks/selectors';
import './styles.css';

function WorkflowColumnList() {
    const dispatch: AppDispatch = useDispatch();

    const workflows = useSelector(selectWorkflows);
    const tasks = useSelector(selectTasksKeyedById);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return;
        }

        const task = tasks[Number(draggableId)];
        const workflowId = Number(destination.droppableId.replace('workflow-', ''));

        dispatch(updateTask({
            ...task,
            workflowId,
        }));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ul className="workflow-column-list">
                {workflows.map((workflow) => (
                    <li key={workflow.id} className="workflow-column-list-item">
                        <WorkflowColumn workflowId={workflow.id} />
                    </li>
                ))}
            </ul>
        </DragDropContext>
    );
}

export default WorkflowColumnList;
