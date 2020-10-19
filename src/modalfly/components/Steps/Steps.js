import React, { useContext, useState } from 'react';
import StepContext from '../../hooks/StepContext';
import * as types from '../../hooks/actions';

export function Steps(props) {
    const stepContext = useContext(StepContext);
    const [stepData, setStepData] = useState({});

    const totalSections = props.children ? props.children.length : 0;
    //Do not render if there are no children
    if (totalSections === 0) {
        return null;
    }
    //Expose next function
    Steps.next = (e) => {
        if (stepContext.store.currentStep < totalSections - 1) {
            stepContext.dispatch({ type: types.STEP_FORWARD, data: stepData });
        } else if (stepContext.store.currentStep === totalSections - 1) {
            stepContext.dispatch({ type: types.PERSIST_STEP_DATA, data: stepData });
        }
        //Clear state
        setStepData({});
    }

    Steps.previous = e => {
        if (stepContext.store.currentStep !== 0) {
            stepContext.dispatch({ type: types.STEP_BACKWARD });
        }
    }

    Steps.complete = e => {
        stepContext.dispatch({ type: types.RESET })
    }
    
    return props.children[stepContext.store.currentStep];
};