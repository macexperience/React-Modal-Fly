import React, { useContext, useState } from 'react';
import StepContext from '../../hooks/StepContext';

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
            stepContext.dispatch({ type: 'STEP_FORWARD', data: stepData });
        } else if (stepContext.store.currentStep === totalSections - 1) {

            stepContext.dispatch({ type: 'PERSIST_STEP_DATA', data: stepData });
        }
        //Clear state
        setStepData({});
    }

    //Handles onChange events for inputs 
    Steps.onChange = e => {
        const inputName = e.target.name;
        stepData[inputName] = e.target.value;
        setStepData(stepData);
    }

    Steps.complete = e => {
        stepContext.dispatch({ type: 'PERSIST_STEP_DATA', data: stepData });
    }

    Steps.previous = e => {
        if (stepContext.store.currentStep !== 0) {
            stepContext.dispatch({ type: 'STEP_BACKWARD' });
        }
    }
    return props.children[stepContext.store.currentStep];
};