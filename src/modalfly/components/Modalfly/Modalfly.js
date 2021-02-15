import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { reducer, initialState } from '../../hooks/reducer';
import * as actions from '../../hooks/actions';
import StepContext from '../../hooks/StepContext';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { isFunction, getContainerStyle, getHeaderStyle, getFooterStyle } from '../../helpers/helpers'
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
    const headerStyle = getHeaderStyle(props);
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
            return (<h3 style={{ color: "red" }}>'Modalfly' Error: At least two 'Step' components are required for workflow mode.</h3>)
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
            if (props.closeBtnClassName) {
                return (<i onClick={onCancel} className={props.closeBtnClassName ? props.closeBtnClassName : ''}></i>);
            }
            return (<i onClick={onCancel} style={styles.closeIcon}>&times;</i>);
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
        //Check 'resetSteps' prop, if 'false', do not reset steps.
        let reset = props.resetSteps === undefined ? true : props.resetSteps;
        //Always reset when in 'single view' mode
        if (props.workflow === undefined) {
            reset = true;
        }
        //Call client's onClose handler
        props.onClose();
        //Reset workflow steps
        if (reset) {
            dispatch({ type: actions.RESET });
        }
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
                            <div id='mf-wrapper' style={{ ...mfStyle, ...styles.mfTransitionStyles[state] }}>
                                {/* Header div */}
                                <div
                                    className={props.headerClassName ? props.headerClassName : ''}
                                    style={headerStyle}>
                                    <h3 style={styles.headerH3}>
                                        {titlesGenerator()}
                                    </h3>
                                    {closeIcon()}
                                </div>
                                {/* Main Content div */}
                                {contentArea()}

                                {/* Progress circles div */}
                                <div style={styles.progressArea}>
                                    {progressCircles()}
                                </div>
                                {/* Footer div */}
                                <div
                                    id='mf-footer'
                                    style={footerStyle}
                                    className={props.footerClassName ? `mf-footer-area ${props.footerClassName}` : 'mf-footer-area'}></div>
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
        React.Children.forEach(prop, (child) => {
            //If in 'workflow' mode, only allow child of Steps
            if (props.workflow && child.type.name !== 'Steps') {
                error = new Error(`${componentName} only accepts children of type 'Option' in workflow mode.`);
            }
        });
        return error;
    },
    //Determines how the footer contents will be justified
    footerContent: PropTypes.oneOf(['left', 'center', 'right', 'spaceBetween', 'spaceAround', 'spaceEvenly']),
    //Show/hide progress circles
    hideProgress: PropTypes.bool,
    //Modal sizes
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extraLarge']),
    //ModalContainer style
    style: PropTypes.object,
    //Footer style
    footerStyle: PropTypes.object,
    //Header class name
    headerClassName: PropTypes.string,
    //Footer class name
    footerClassName: PropTypes.string,
    //Close button class name
    closeBtnClassName: PropTypes.string,
    //Sets modal to workflow mode
    workflow: PropTypes.bool,
    onClose: (props, propName, componentName) => {
        if (props.onClose && !isFunction(props.onClose)) {
            return new Error(`${componentName} onClose prop must be a function.`)
        }
    }
};