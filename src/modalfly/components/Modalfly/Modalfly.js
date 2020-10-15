import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { reducer, initialState } from '../../hooks/reducer';
import * as actions from '../../hooks/actions';
import StepContext from '../../hooks/StepContext';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { isFunction, getContainerStyle, getFooterStyle } from '../../helpers/helpers'
import * as styles from '../../styles/styles';

export function Modalfly(props) {
    //Create reducer
    const [store, dispatch] = useReducer(reducer, initialState);

    const [containerRef, setContainerRef] = useState(null);

    //Get container reference
    useEffect(() => {
        let containerRef = document.getElementById('modalfly-container');
        if (containerRef) {
            setContainerRef(containerRef);
        } else {
            setContainerRef(false);
        }
    }, [props.show]);

    //Get container and footer styles
    const mfStyle = getContainerStyle(props);
    const footerStyle = getFooterStyle(props);
    
    if (!props.show) {
        return null;
    }

    //Check mode
    const inWorkflowMode = props.workflow && props.children;

    //If in workflow mode, count steps and get step titles
    let titlesList = []
    let currentStepCount;
    if (inWorkflowMode) {
        const children = props.children.props.children
        //Ensure there exist at least 2 steps for workflow mode
        const isAnObject = typeof children === 'object' && children !== null;
        const isAnArray = Array.isArray(children);
        if (isAnObject && !isAnArray) {
            return (<h3 style={{color: "red"}}>'Modalfly' Error: At least two 'Step' components are required for workflow mode.</h3>)
        }
        //Count the current steps
        currentStepCount = children.length;
        if (currentStepCount === 0) return new Error(`Modalfly workflow mode requires at least one Step.`);
        //Get titles
        titlesList = children.map(step => {
            return step.props.title && typeof step.props.title === 'string' ? step.props.title : 'Attention'
        });
    }

    //Check for onClose param
    const onCloseIsValid = isFunction(props.onClose);
    const displayCloseIcon = props.onClose && onCloseIsValid;

    const closeIcon = () => {
        if (displayCloseIcon) {
            return (<span onClick={onCancel} style={styles.closeIcon}>&times;</span>);
        } else {
            return null;
        }
    }

    // Generate progress circles for workflow mode
    const progressCircles = () => {
        //Return if not in workflow mode
        if (!inWorkflowMode || props.hideProgress) return null;

        let circles = [];
        for (let i = 0; i < currentStepCount; i++) {
            if (i === store.currentStep) {
                circles.push(<span key={i} className='mf-dots active'></span>);
            } else {
                circles.push(<span key={i} className='mf-dots'></span>);
            }
        }
        return circles;
    }

    const titlesGenerator = () => {
        if (props.title && typeof props.title === 'string') {
            return props.title;
        }
        else if (Array.isArray(titlesList) && titlesList.length !== 0) {
            return titlesList[store.currentStep];
        } else {
            return 'Attention';
        }
    }

    const onCancel = () => {
        dispatch({ type: actions.RESET });
        //Close modal
        props.onClose();
    }

    const contentArea = () => {
        return (
            <div style={styles.contentArea} currentstep={store.currentStep}>
                {props.children}
            </div>
        );
    }

    const modal = (
        <>
            <StepContext.Provider value={{ store, dispatch }}>
                <Transition
                    unmountOnExit
                    in={props.show}
                    timeout={{ appear: 0, enter: 600, exit: 500 }}
                    appear
                >
                    {
                        state => (
                            <div id='mf-wrapper' style={{
                                ...mfStyle,
                                ...styles.mfTransitionStyles[state]
                            }}>

                                <div style={styles.headerArea}>
                                    <h3 style={styles.headerH3}>
                                        {titlesGenerator()}
                                    </h3>
                                </div>

                                {closeIcon()}

                                {contentArea()}

                                <div style={styles.progressArea}>
                                    {progressCircles()}
                                </div>

                                <div id='mf-footer' style={footerStyle} className='mf-footer-area'></div>
                            </div>
                        )
                    }

                </Transition>
            </StepContext.Provider>
        </>
    );

    if (containerRef) {
        return ReactDOM.createPortal(modal, containerRef);
    }

    return modal;
}

Modalfly.propTypes = {
    //Validate children 
    children: (props, propName, componentName) => {
        let error;
        const prop = props[propName];
        // console.log('React.Children.count:', React.Children.toArray())
        React.Children.forEach(prop, (child) => {
            //If in 'workflow' mode, only allow child of Steps
            if (props.workflow && child.type.name !== 'Steps') {
                error = new Error(`${componentName} only accepts children of type 'Option' in workflow mode.`);
            }
        });
        return error;
    },
    //Modal sizes
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extraLarge']),
    //Determines how the footer contents will be justified
    footerContent: PropTypes.oneOf(['left', 'center', 'right', 'spaceBetween', 'spaceAround', 'spaceEvenly']),
    //Show/hide progress circles
    hideProgress: PropTypes.bool,
    //Sets modal to workflow mode
    workflow: PropTypes.bool,
    onClose: (props, propName, componentName) => {
        if (props.onClose && !isFunction(props.onClose)) {
            return new Error(`${componentName} onClose prop must be a function.`)
        }
    }
};