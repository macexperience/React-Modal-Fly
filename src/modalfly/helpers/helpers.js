import * as styles from '../styles/styles';

/** Checks if the param is a function
 * @version 1.0
 * @param {*} functionToCheck - Variable to check if it is a function
 * @returns {Boolean} If the provided param is a function
 */
export function isFunction(functionToCheck) {
    if (functionToCheck === null || functionToCheck === undefined) {
        return false;
    } else {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
}


export function getContainerStyle(props) {
    let mfStyle = styles.mfDefaultStyle;
    if (props.size === 'small') {
        mfStyle = { ...mfStyle, ...styles.mfSmallStyle };
    } else if (props.size === 'medium') {
        mfStyle = { ...mfStyle, ...styles.mfMediumStyle };
    } else if (props.size === 'large') {
        mfStyle = { ...mfStyle, ...styles.mfLargeStyle };
    } else if (props.size === 'extraLarge') {
        mfStyle = { ...mfStyle, ...styles.mfXLStyle };
    }
    return mfStyle;
}

export function getFooterStyle(props) {
    let footerStyle = styles.footerArea;
    if (props.footerContent === 'left') {
        footerStyle = { ...footerStyle, ...styles.footerLeft };
    } else if (props.footerContent === 'center') {
        footerStyle = { ...footerStyle, ...styles.footerCenter };
    } else if (props.footerContent === 'right') {
        footerStyle = { ...footerStyle, ...styles.footerRight };
    } else if (props.footerContent === 'spaceBetween') {
        footerStyle = { ...footerStyle, ...styles.footerSpaceBetween};
    } else if (props.footerContent === 'spaceAround') {
        footerStyle = { ...footerStyle, ...styles.footerSpaceAround };
    } else if (props.footerContent === 'spaceEvenly') {
        footerStyle = { ...footerStyle, ...styles.footerSpaceEvenly };
    }
    return footerStyle;
}