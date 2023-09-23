import { render, screen } from "@testing-library/react";
import WorkflowHeaderItem from "..";

describe('<WorkflowHeaderItem />', () => {
    it('should render the list item containing the workflow name', () => {
        render(<WorkflowHeaderItem name="Test workflow" />);

        const list = screen.getByRole('listitem');
        const workflowName = screen.getByRole('heading', { name: /test workflow/i });

        expect(list).toBeInTheDocument();
        expect(workflowName).toBeInTheDocument();
    });
});
