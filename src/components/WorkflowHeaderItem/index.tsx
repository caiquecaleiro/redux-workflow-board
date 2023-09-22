import './styles.css';

interface WorkflowHeaderItemProps {
    id: number;
    name: string;
}

function WorkflowHeaderItem({ name }: WorkflowHeaderItemProps) {
    return (
        <li className="workflow-header-item">
            <h2>{name}</h2>
        </li>
    );
}

export default WorkflowHeaderItem;
