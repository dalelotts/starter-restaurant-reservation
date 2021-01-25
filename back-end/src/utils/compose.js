/**
 * Performs a standard right-to-left function composition.
 * Each argument must be a unary function.
 *
 * @param delegates
 *  the unary functions to compose
 *
 * @returns {function(*=): *}
 *  a function that is a right-to-left composition of the delegate functions.
 */

const traceFunction = require("../logging/traceFunction");

function compose (...delegates) {
  const tracedDelegates = delegates.map(delegate => traceFunction(delegate))
  return (argument) => {
    return tracedDelegates.reduceRight((accumulator, delegate) => delegate(accumulator), argument);
  }
}

module.exports = compose;
