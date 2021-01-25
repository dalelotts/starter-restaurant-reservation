const logger = require("./logger")

function traceFunction(delegate, filename) {
  const methodName = delegate.name || 'anonymous'
  const fileName = delegate.__filename || filename

  return (...args) => {
    logger.debug({__fileName: fileName,  methodName, args});
    const data = delegate(...args)
    logger.trace({__fileName: fileName,  methodName, return: true, data});
    return data;
  }
}

module.exports = traceFunction;
