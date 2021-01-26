const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req, res) {
  req.log.debug({ __filename, methodName: create.name });

  const data = await service.create(req.body.data, req.log);

  res.status(201).json({
    data: data,
  });

  req.log.trace({ __filename, methodName: create.name, return: true, data });
}

async function list(req, res) {
  req.log.debug({ __filename, methodName: list.name });

  const data = await service.list(req.query.date, req.log);

  res.json({
    data,
  });

  req.log.trace({ __filename, methodName: list.name, return: true, data });
}

module.exports = {
  create: asyncErrorBoundary(create),
  list: asyncErrorBoundary(list),
};
