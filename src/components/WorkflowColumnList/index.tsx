import { useSelector } from 'react-redux';
import WorkflowColumn from '../WorkflowColumn';
import { selectWorkflows } from '../../store/workflows/selectors';
import './styles.css';

function WorkflowColumnList() {
    const workflows = useSelector(selectWorkflows);

    return (
        <ul className="workflow-column-list">
            {workflows.map((workflow) => (
                <li key={workflow.id} className="workflow-column-list-item">
                    <WorkflowColumn workflowId={workflow.id} />
                </li>
            ))}
        </ul>
    );
}

export default WorkflowColumnList;
