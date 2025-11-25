import BaseError from "./baseError.js";

class NotFound extends BaseError {
  constructor(msg = "Page not found") {
    super(msg, 404);
  }
}

export default NotFound;