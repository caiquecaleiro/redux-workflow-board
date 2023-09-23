import { screen } from '@testing-library/react';
import Board from '../index';
import { createServer, renderWithProviders } from '../../../utils/test-utils';

describe('<Board />', () => {
    createServer([
        {
            path: 'http://localhost:3005/workflows',
            res: () => {
                return [{
                    id: 1,
                    name: 'Test workflow',
                }]
            }
        },
        {
            path: 'http://localhost:3005/tasks',
            res: () => {
                return [{
                    id: 1,
                    title: 'Test card',
                    description: 'Test description',
                    estimationPoints: 3,
                    workflowId: 1,
                    taskTypeId: 1,
                }]
            }
        }
    ]);

    it('should render the workflow header and columns list', async () => {
        renderWithProviders(<Board />);

        const board = await screen.findByTestId('board');

        expect(board).toBeInTheDocument();
    })
});
