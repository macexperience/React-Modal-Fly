/** Checks if the param is a function
 * @version 1.0
 * @param {*} functionToCheck - Variable to check if it is a function
 * @returns {Boolean} If the provided param is a function
 */
export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}