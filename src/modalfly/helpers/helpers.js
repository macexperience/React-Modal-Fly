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

/** Generates the modal style object
 * @version 1.0
 * @param {Object} props - Props object
 * @param {String} props.size - The size for the modal
 * @returns {Object} The modal styles object
 */
export function getContainerStyle(props) {
    let mfStyle = styles.mfDefaultStyle;
    //Check for additional inline styles
    if (props.style) {
        mfStyle = { ...mfStyle, ...props.style };
    }
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

/** Generates the header container style object
 * @version 1.0
 * @param {Object} props - Props object
 * @returns {Object} The header container styles object
 */
export function getHeaderStyle(props) {
    //If a header style has been provided,
    //only set the header placement on the grid
    if (props.headerClassName) {
        //Set minimum style requirement
        return {
            gridColumn: '1/4',
            gridRow: '1/2'
        };
    }
    return styles.headerArea;
}

/** Generates the footer container style object
 * @version 1.1
 * @param {Object} props - Props object
 * @param {String} props.footerContent - Specify how the footer area will arrange its contents (flexbox's 'justifyContent')
 * @returns {Object} The footer container styles object
 */
export function getFooterStyle(props) {
    //If a footer class name has been provided,
    //only set the footer placement on the grid
    if (props.footerClassName) {
        //Set minimum style requirement
        return {
            gridColumn: '1/4',
            gridRow: '4/5'
        };
    }
    let footerStyle = styles.footerArea;
    //Check for additional inline styles
    if (props.footerStyle) {
        footerStyle = { ...footerStyle, ...props.footerStyle };
    }
    if (props.footerContent === 'left') {
        footerStyle = { ...footerStyle, ...styles.footerLeft };
    } else if (props.footerContent === 'center') {
        footerStyle = { ...footerStyle, ...styles.footerCenter };
    } else if (props.footerContent === 'right') {
        footerStyle = { ...footerStyle, ...styles.footerRight };
    } else if (props.footerContent === 'spaceBetween') {
        footerStyle = { ...footerStyle, ...styles.footerSpaceBetween };
    } else if (props.footerContent === 'spaceAround') {
        footerStyle = { ...footerStyle, ...styles.footerSpaceAround };
    } else if (props.footerContent === 'spaceEvenly') {
        footerStyle = { ...footerStyle, ...styles.footerSpaceEvenly };
    }
    return footerStyle;
}