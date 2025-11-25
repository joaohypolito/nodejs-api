class BaseError extends Error {
  constructor(msg = "Erro interno do servidor.", status = 500) {
    super();
    this.msg = msg;
    this.status = status;
  }

  sendResponse(res) {
    res.status(this.status).send({
      msg: this.msg,
      status: this.status
    });
  }
}

export default BaseError;