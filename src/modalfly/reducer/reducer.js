import { STEP_FORWARD, STEP_BACKWARD, PERSIST_STEP_DATA, RESET } from './actions';

//Define initial state
export const initialState = {
    currentStep: 0,
    stepData: []
};

/*
Don't mutate 'state'.
Create a copy with Object.assign()
*/
export function reducer(state = initialState, action) {
    //Set initial state
    switch (action.type) {
        case STEP_FORWARD:
            return {
                ...state,
                ...{
                    currentStep: state.currentStep + 1,
                    stepData: [
                        ...state.stepData,
                        action.data
                    ]
                }
            };
        case STEP_BACKWARD:
            return {
                ...state,
                ...{ currentStep: state.currentStep - 1 }
            };
        case PERSIST_STEP_DATA:
            //Add new step data to array
            return Object.assign({}, state, {
                stepData: [
                    ...state.stepData,
                    action.data
                ]
            });
        case RESET:
            return initialState;
        default:
            return state;
    }
};