import { render, screen } from '@testing-library/react';
import Card from '../index';

describe('<Card />', () => {
    it('should render the card attributes', () => {
        const props = {
            id: 1,
            title: 'Test card',
            description: 'Test description',
            estimationPoints: 3,
            workflowId: 1,
            taskTypeId: 1,
        };

        render(<Card {...props} />);

        const title = screen.getByRole('heading', { name: /test card/i });
        const estimationPoints = screen.getByText(/points: 3/i);

        expect(title).toBeInTheDocument();
        expect(estimationPoints).toBeInTheDocument();
    });
});
