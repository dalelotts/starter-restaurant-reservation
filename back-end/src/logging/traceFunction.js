const globalLogger = require("./logger");

/**
 * Used to log calls to unary functions, or binary functions where the second parameter is a logger instance.
 * @param delegate
 *  the function being wrapped.
 * @param filename
 *  optional file name where the delegate function is defined.
 *
 * @returns {function(*=, logger): *}
 *  a binary function where the second paramater is a logger instance.
 */

function traceFunction(delegate, filename) {
  const methodName = delegate.name || "anonymous";
  const fileName = delegate.__filename || filename;

  /**
   * The logger should be req.log, but will default to the shared logger if not specified.
   */

  return (argument, logger = globalLogger) => {
    logger.debug({ __fileName: fileName, methodName, argument });

    const data = delegate(argument, logger);

    logger.trace({ __fileName: fileName, methodName, return: true, data });

    return data;
  };
}

module.exports = traceFunction;
