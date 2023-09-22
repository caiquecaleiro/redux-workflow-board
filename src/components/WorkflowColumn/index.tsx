import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { selectTasksFilteredByWorkflowId } from '../../store/tasks/selectors';
import Card from '../Card';
import './styles.css';

interface CardsListItemProps {
    workflowId: number;
}

function WorkflowColumn(props: CardsListItemProps) {
    const tasks = useSelector((state: AppState) =>
        selectTasksFilteredByWorkflowId(state, props.workflowId)
    );

    return (
        <ul
            className="workflow-column"
        >
            {tasks.map((task) => (
                <li key={task.id} className="workflow-column-item">
                    <Card {...task} />
                </li>
            ))}
        </ul>
    )
}

export default WorkflowColumn;
