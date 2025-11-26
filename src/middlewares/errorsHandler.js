import mongoose from "mongoose";
import BaseError from "../errors/baseError.js";
import BadRequest from "../errors/badRequest.js";
import ValidationError from "../errors/validationError.js";

// eslint-disable-next-line no-unused-vars
function errorsHandler(erro, req, res, next) {
  console.log(erro);

  if (erro instanceof mongoose.Error.CastError) {
    new BadRequest().sendResponse(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).sendResponse(res);
  } else if (erro instanceof BaseError) {
    erro.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
};

export default errorsHandler;