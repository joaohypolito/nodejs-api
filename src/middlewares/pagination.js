import BadRequest from "../errors/badRequest.js";

async function pagination(req, res, next) {
  try {
    let { qLimit = 5, qPages = 1, sort = "_id:-1" } = req.query;

    let [qField, qOrder] = sort.split(":");

    qLimit = parseInt(qLimit);
    qPages = parseInt(qPages);
    qOrder = parseInt(qOrder);

    const result = req.result;

    if (qLimit > 0 && qPages > 0) {
      const paginatedResult = await result.find()
        .sort({ [qField]: qOrder })
        .skip((qPages - 1) * qLimit)
        .limit(qLimit)
        .exec();

      return res.status(200).json(paginatedResult);
    } else {
      next(new BadRequest());
    }
  } catch (error) {
    next(error);
  }
}

export default pagination;