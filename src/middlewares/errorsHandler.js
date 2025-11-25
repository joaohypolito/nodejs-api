import mongoose from "mongoose";
import BaseError from "../errors/baseError.js";
import WrongReq from "../errors/wrongRequisition.js";
import ValidationError from "../errors/validationError.js";
import NotFound from "../errors/notFound.js";

// eslint-disable-next-line no-unused-vars
function errorsHandler(erro, req, res, next) {
  console.log(erro);

  if (erro instanceof mongoose.Error.CastError) {
    new WrongReq().sendResponse(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).sendResponse(res);
  } else if (erro instanceof NotFound) {
    erro.sendResponse(res);
  } else {
    new BaseError().sendResponse(res);
  }
};

export default errorsHandler;