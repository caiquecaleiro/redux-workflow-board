import { screen } from "@testing-library/react";
import WorkflowColumnList from "..";
import { renderWithProviders } from "../../../utils/test-utils";

// Mock react-beautiful-dnd functions
jest.mock('react-beautiful-dnd', () => ({
    DragDropContext: ({ children }: { children: React.ReactNode }) => children,
    Droppable: ({ children }: { children: (provided: any) => JSX.Element }) =>
        children({ innerRef: jest.fn(), droppableProps: {} }),
    Draggable: ({ children }: { children: (provided: any) => JSX.Element }) =>
        children({ innerRef: jest.fn(), draggableProps: {} }),
}));

const renderComponent = () => {
    const initialTasks = {
        data: [
            { id: 1, title: 'Test card 1', description: 'Test description 1', estimationPoints: 3, workflowId: 1, taskTypeId: 1 },
            { id: 2, title: 'Test card 2', description: 'Test description 2', estimationPoints: 5, workflowId: 2, taskTypeId: 1 },
        ],
        error: null,
        isLoading: false
    };
    const initialWorkflows = {
        data: [
            { id: 1, name: 'Test workflow 1' },
            { id: 2, name: 'Test workflow 2' },
        ],
        error: null,
        isLoading: false
    };

    renderWithProviders(<WorkflowColumnList />, {
        preloadedState: {
            tasks: initialTasks,
            workflows: initialWorkflows
        }
    })
}

describe('<WorkflowColumnList />', () => {
    it('should render the workflow list with their children tasks', () => {
        renderComponent();

        const workflowColumnList = screen.getAllByRole('list');
        const workflowColumnListItems = screen.getAllByRole('listitem');
        const tasks = screen.getAllByText(/test card/i);

        expect(workflowColumnList).toHaveLength(3);
        expect(workflowColumnListItems).toHaveLength(4)
        expect(tasks).toHaveLength(2);
    });
});
