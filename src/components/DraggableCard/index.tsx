import { Draggable } from 'react-beautiful-dnd';
import Card, { CardProps } from '../Card';

interface DraggableCardProps {
    card: CardProps;
    index: number;
}

function DraggableCard(props: DraggableCardProps) {
    const { card, index } = props;

    return (
        <Draggable
            draggableId={card.id.toString()} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Card {...card} />
                </div>
            )}
        </Draggable>
    );
}

export default DraggableCard;
