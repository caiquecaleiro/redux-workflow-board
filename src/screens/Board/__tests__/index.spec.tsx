import { render, screen } from '@testing-library/react';
import Board from '../index';

describe('<Board />', () => {
    it('should render a header text with "Board here"', () => {
        render(<Board />);

        const heading = screen.getByRole('heading', {
            name: /board here/i
        });

        expect(heading).toBeInTheDocument();
    })
});
