import { Task } from '../../types/task';
import './styles.css';

export interface CardProps extends Task { }

function Card(props: CardProps) {
    return (
        <div className="card">
            <h4>{props.title}</h4>
            <div className="card-details">
                <span>Points: {props.estimationPoints}</span>
            </div>
        </div>
    )
}

export default Card;
