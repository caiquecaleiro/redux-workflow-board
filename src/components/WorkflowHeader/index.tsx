import { useSelector } from "react-redux";
import WorkflowHeaderItem from "../WorkflowHeaderItem";
import { selectWorkflows } from "../../store/selectors/workflows";
import './styles.css';

function WorkflowHeader() {
    const workflows = useSelector(selectWorkflows);

    return (
        <ul className="workflow-header">
            {workflows.map((workflow) => (
                <WorkflowHeaderItem key={workflow.id} {...workflow} />
            ))}
        </ul>
    )
}

export default WorkflowHeader;