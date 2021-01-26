const pino = require("pino");

const level = process.env.LOG_LEVEL || "info";
const nodeEnv = process.env.NODE_ENV || "development";
const prettyPrint = nodeEnv === "development";

const logger = pino({
  level,
  prettyPrint,
});

module.exports = logger;
