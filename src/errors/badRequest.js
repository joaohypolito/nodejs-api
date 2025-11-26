import BaseError from "./baseError.js";

class BadRequest extends BaseError {
  constructor(msg = "Um ou mais dados fornecidos estão incorretos") {
    super(msg, 400);
  }
}

export default BadRequest;