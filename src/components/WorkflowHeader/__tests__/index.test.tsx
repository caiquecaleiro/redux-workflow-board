import { screen } from "@testing-library/react";
import WorkflowHeader from "..";
import { renderWithProviders } from "../../../utils/test-utils";

describe('<WorkflowHeader />', () => {
    it('should render a list of workflow items', () => {
        const initialWorkflows = {
            data: [
                {
                    id: 1,
                    name: 'Test workflow',
                },
                {
                    id: 2,
                    name: 'Test workflow 2',
                },
            ],
            isLoading: false,
            error: null
        };

        renderWithProviders(<WorkflowHeader />, {
            preloadedState: {
                workflows: initialWorkflows
            }
        });

        const workflowHeaderList = screen.getByRole('list');
        const workflowHeaderListItem = screen.getAllByRole('listitem');

        expect(workflowHeaderList).toBeInTheDocument();
        expect(workflowHeaderListItem).toHaveLength(2);
    });
});
