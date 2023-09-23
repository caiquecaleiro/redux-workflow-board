import { configureStore } from "@reduxjs/toolkit";
import { TasksState } from "../../../types/task";
import { selectTasks, selectTasksFilteredByWorkflowId, selectTasksKeyedById } from "../selectors";

const initialState: TasksState = {
    data: [
        { id: 1, title: 'Task 1', workflowId: 1, estimationPoints: 1, taskTypeId: 1 },
        { id: 2, title: 'Task 2', workflowId: 2, estimationPoints: 2, taskTypeId: 2 },
        { id: 3, title: 'Task 3', workflowId: 1, estimationPoints: 3, taskTypeId: 3 },
    ],
    isLoading: false,
    error: null,
};

const store = configureStore({
    reducer: {
        tasks: (state = initialState) => {
            return state;
        },
    },
});

describe('Tasks Selectors', () => {
    describe('selectTasks', () => {
        it('should return tasks from the state', () => {
            const state = store.getState();

            const result = selectTasks(state);

            expect(result).toEqual(initialState.data);
        });

        it('should be memoized when state does not change', () => {
            const state = store.getState();

            const result1 = selectTasks(state);
            const result2 = selectTasks(state);

            expect(result2).toBe(result1);
        });
    });

    describe('selectTasksKeyedById', () => {
        it('should return tasks keyed by id', () => {
            const state = store.getState();

            const result = selectTasksKeyedById(state);

            const expectedKeyedTasks = {
                1: initialState.data[0],
                2: initialState.data[1],
                3: initialState.data[2],
            };

            expect(result).toEqual(expectedKeyedTasks);
        });

        it('should be memoized when state does not change', () => {
            const state = store.getState();

            const result1 = selectTasksKeyedById(state);
            const result2 = selectTasksKeyedById(state);

            const expectedKeyedTasks = {
                1: initialState.data[0],
                2: initialState.data[1],
                3: initialState.data[2],
            };

            expect(result1).toEqual(expectedKeyedTasks);
            expect(result2).toBe(result1);
            expect(selectTasksKeyedById.recomputations()).toBe(1);
        });
    });

    describe('selectTasksFilteredByWorkflowId', () => {
        it('should return tasks filtered by workflowId', () => {
            const state = store.getState();

            const result = selectTasksFilteredByWorkflowId(state, 1);

            const expectedFilteredTasks = [initialState.data[0], initialState.data[2]];

            expect(result).toEqual(expectedFilteredTasks);
        });

        it('should be memoized when calling with the same parameters', () => {
            const state = store.getState();

            const result1 = selectTasksFilteredByWorkflowId(state, 1);
            const result2 = selectTasksFilteredByWorkflowId(state, 1);

            const expectedFilteredTasks = [initialState.data[0], initialState.data[2]];

            expect(result1).toEqual(expectedFilteredTasks);
            expect(result2).toBe(result1);
            expect(selectTasksFilteredByWorkflowId.recomputations()).toBe(1);
        });

        it('should recompute when passing a different workflowId parameter', () => {
            const state = store.getState();

            selectTasksFilteredByWorkflowId(state, 1);
            selectTasksFilteredByWorkflowId(state, 2);

            expect(selectTasksFilteredByWorkflowId.recomputations()).toBe(2);
        });
    });
});
