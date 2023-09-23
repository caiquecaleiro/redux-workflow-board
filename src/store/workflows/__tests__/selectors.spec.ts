import { configureStore } from "@reduxjs/toolkit";
import { WorkflowsState } from "../../../types/workflow";
import { selectWorkflows } from "../selectors";

const initialState: WorkflowsState = {
    data: [
        { id: 1, name: 'Workflow 1' },
        { id: 2, name: 'Workflow 2' },
        { id: 3, name: 'Workflow 3' },
    ],
    isLoading: false,
    error: null,
};

const store = configureStore({
    reducer: {
        workflows: (state = initialState) => {
            return state;
        },
    },
});

describe('Workflows Selectors', () => {
    describe('selectWorkflows', () => {
        it('should return workflows from the state', () => {
            const state = store.getState();

            const result = selectWorkflows(state);

            expect(result).toEqual(initialState.data);
        });

        it('should be memoized when state does not change', () => {
            const state = store.getState();

            const result1 = selectWorkflows(state);
            const result2 = selectWorkflows(state);

            expect(result2).toBe(result1);
        });
    });
});
