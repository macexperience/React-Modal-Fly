import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { reducer, initialState } from '../hooks/reducer';
import * as actions from '../hooks/actions';
import StepContext from '../hooks/StepContext';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isFunction, getModalStyles } from '../helpers/helpers'
import * as styles from '../styles/styles';

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
    });


    //Set root style
    let wrapperClass = classNames({
        'mf-wrapper': true,
        'mf-small': props.size === 'small',
        'mf-meduim': props.size === 'medium',
        'mf-large': props.size === 'large',
        'mf-xl': props.size === 'extraLarge'
    });

    const mfStyle = getModalStyles(props);
    console.log('mfStyle:', mfStyle);


    //Set Footer style
    let footerClass = classNames({
        'mf-footer-area': true,
        'mf-footer-left': props.footerContent === 'left',
        'mf-footer-center': props.footerContent === 'center',
        'mf-footer-right': props.footerContent === 'right',
        'mf-footer-space-between': props.footerContent === 'spaceBetween',
        'mf-footer-space-around': props.footerContent === 'spaceAround',
        'mf-footer-space-evenly': props.footerContent === 'spaceEvenly'
    });

    /* Do not show component if show is false */
    if (!props.show) {
        return null;
    }
    //Check mode
    const inWorkflowMode = props.workflow && props.children;

    //If in workflow mode, count steps and get step titles
    let titlesList = []
    let currentStepCount;
    if (inWorkflowMode) {
        //Count the current steps
        currentStepCount = props.children.props.children.length;
        if (currentStepCount === 0) return new Error(`Modalfly workflow mode requires at least one Step.`);
        //Get titles
        const divSteps = props.children.props.children;
        titlesList = divSteps.map(step => {
            return step.props.title && typeof step.props.title === 'string' ? step.props.title : 'Attention'
        });
    }

    //Check for onClose param
    const onCloseIsValid = isFunction(props.onClose);
    const displayCloseIcon = props.onClose && onCloseIsValid;

    const closeIcon = () => {
        if (displayCloseIcon) {
            return (<span onClick={onCancel} className="mf-close-icon">&times;</span>);
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
            <div className="mf-content-area" currentstep={store.currentStep}>
                {props.children}
            </div>
        );
    }

    const modal = (
        <StepContext.Provider value={{ store, dispatch }}>
            <CSSTransition
                unmountOnExit
                in={props.show}
                timeout={{ appear: 0, enter: 0, exit: 500 }}
                classNames="mf"
                appear
            >
                <div id='mf-wrapper' className={wrapperClass}>

                    <div className="mf-header-area">
                        <h3>
                            {titlesGenerator()}
                        </h3>
                    </div>

                    {closeIcon()}

                    {contentArea()}

                    <div className="mf-progress-area">
                        {progressCircles()}
                    </div>

                    <div id='mf-footer' className={footerClass}></div>
                </div>
            </CSSTransition>
        </StepContext.Provider>
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