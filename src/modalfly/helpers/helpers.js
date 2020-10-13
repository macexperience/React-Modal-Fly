import * as styles from '../styles/styles';

/** Checks if the param is a function
 * @version 1.0
 * @param {*} functionToCheck - Variable to check if it is a function
 * @returns {Boolean} If the provided param is a function
 */
export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}


export function getModalStyles(props) {
    let mfStyle = mfDefaultStyle;
    if (props.size === 'small') {
        mfStyle = {...mfStyle, ...mfSmallStyle};
    } else if (props.size === 'medium') {
        mfStyle = {...mfStyle, ...mfMediumStyle};
    } else if (props.size === 'large') {
        mfStyle = {...mfStyle, ...mfLargeStyle};
    } else if (props.size === 'extraLarge') {
        mfStyle = {...mfStyle, ...mfXLStyle};
    }
    return mfStyle;
}