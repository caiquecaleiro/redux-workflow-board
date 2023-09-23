
import { screen } from '@testing-library/react';
import WorkflowColumn from '..';
import { renderWithProviders } from '../../../utils/test-utils';

// Mock react-beautiful-dnd functions
jest.mock('react-beautiful-dnd', () => ({
    Droppable: ({ children }: { children: (provided: any) => JSX.Element }) =>
        children({ innerRef: jest.fn(), droppableProps: {} }),
    Draggable: ({ children }: { children: (provided: any) => JSX.Element }) =>
        children({ innerRef: jest.fn(), draggableProps: {} }),
}));

describe('<WorkflowColumn />', () => {
    it('should render the workflow column with all tasks filtered by the workflowId', () => {
        const initialTasks = {
            data: [
                { id: 1, title: 'Test card 1', description: 'Test description 1', estimationPoints: 3, workflowId: 1, taskTypeId: 1 },
                { id: 2, title: 'Test card 2', description: 'Test description 2', estimationPoints: 5, workflowId: 2, taskTypeId: 1 },
                { id: 3, title: 'Test card 3', description: 'Test description 3', estimationPoints: 1, workflowId: 1, taskTypeId: 1 },
            ],
            isLoading: false,
            error: null
        };

        renderWithProviders(<WorkflowColumn workflowId={1} />, {
            preloadedState: {
                tasks: initialTasks
            }
        });

        const workflowColumnList = screen.getByRole('list');
        const workflowColumnListItems = screen.getAllByRole('listitem');
        const task1 = screen.getByText(/test card 1/i);
        const task3 = screen.getByText(/test card 3/i);

        expect(workflowColumnList).toBeInTheDocument();
        expect(workflowColumnListItems).toHaveLength(2);
        expect(task1).toBeInTheDocument();
        expect(task3).toBeInTheDocument();
    });
});
