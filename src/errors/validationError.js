import BaseError from "./baseError.js";


class ValidationError extends BaseError {
  constructor(erro){
    const errorMessages = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");
      
    super(`Os seguintes erros foram encontrados: ${errorMessages}`, 400);
  }
}

export default ValidationError;