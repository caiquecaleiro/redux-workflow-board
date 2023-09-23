import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from '../DraggableCard';
import { AppState } from '../../store';
import { selectTasksFilteredByWorkflowId } from '../../store/tasks/selectors';
import './styles.css';

interface CardsListItemProps {
    workflowId: number;
}

function WorkflowColumn(props: CardsListItemProps) {
    const tasks = useSelector((state: AppState) =>
        selectTasksFilteredByWorkflowId(state, props.workflowId)
    );

    return (
        <Droppable
            droppableId={`workflow-${props.workflowId}`}
        >
            {(provided) => (
                <ul
                    className="workflow-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {tasks.map((task, index) => (
                        <li key={task.id} className="workflow-column-item">
                            <DraggableCard card={task} index={index} />
                        </li>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
        </Droppable>
    );
}

export default WorkflowColumn;
