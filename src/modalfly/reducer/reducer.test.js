import { reducer, initialState } from './reducer';
import * as types from './actions';

describe('modalfly reducer', () => {
    it('should return the initial state', () => {
        expect.assertions(1);
        expect(reducer(undefined, {})).toEqual({
            currentStep: 0,
            stepData: []
        });
    });
    it('should handle STEP_FORWARD', () => {
        expect.assertions(1);
        const action = {
            type: types.STEP_FORWARD,
            data: { name: 'john doe' }
        };
        expect(reducer(initialState, action)).toEqual({
            currentStep: 1,
            stepData: [{ name: 'john doe' }]
        });
    });
    it('should handle STEP_BACKWARD', () => {
        expect.assertions(1);
        const state = {
            currentStep: 1,
            stepData: [{ name: 'john doe' }]
        };
        const action = { type: types.STEP_BACKWARD };
        expect(reducer(state, action)).toEqual({
            currentStep: 0,
            stepData: [{ name: 'john doe' }]
        });
    });
    it('should handle PERSIST_STEP_DATA', () => {
        expect.assertions(1);
        const state = {
            currentStep: 2,
            stepData: [{ name: 'john doe' }]
        };
        const action = {
            type: types.PERSIST_STEP_DATA,
            data: { phone: '1-800-800-1234' }
        };
        expect(reducer(state, action)).toEqual({
            currentStep: 2,
            stepData: [{ name: 'john doe' }, { phone: '1-800-800-1234' }]
        });
    });
    it('should handle RESET', () => {
        expect.assertions(1);
        const state = {
            currentStep: 1,
            stepData: [{ name: 'john doe' }]
        };
        const action = { type: types.RESET };
        expect(reducer(state, action)).toEqual({
            currentStep: 0,
            stepData: []
        });
    });
});
