const pinoHttp = require("pino-http");
const { nanoid } = require("nanoid");
const logger = require('./logger')

const httpLogger = pinoHttp({
  genReqId: (request) => request.headers['x-request-id'] || request.headers['x-vercel-id'] || nanoid(),
  logger,
});

module.exports = httpLogger;
