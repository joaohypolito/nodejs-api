/**
 * Controller responsável por gerenciar as operações CRUD de autores.
 * Segue o padrão Routes -> Controller -> Model, isolando a lógica de negócio
 * e centralizando o acesso ao MongoDB.
 */
import NotFound from "../errors/notFound.js";
import { Authors } from "../models/index.js";

class AuthorsController {

  static async allAuthors(req, res, next) {
    try {
      const authors = Authors.find();

      req.result = authors;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async findAuthorById(req, res, next) {
    try {
      const authorFound = await Authors.findById(req.params.id);
      
      if (!authorFound) {
        next(new NotFound("Autor(a) não encontrado(a)"));
        return;
      }

      res.status(200).send(authorFound);
    } catch (erro) {
      next(erro);
    }
  }

  static async addNewAuthor(req, res, next) {
    try {
      const newAuthor = await Authors.create(req.body);
      
      res.status(201).json({ message: "Autor cadastrado com sucesso", author: newAuthor });
    } catch (erro) {
      next(erro);
    }
  }

  static async updateOneAuthor(req, res, next) {
    try {
      const updated = await Authors.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      if (!updated) {
        next(new NotFound("Autor(a) não encontrado(a)"));
        return;
      }

      res.status(200).json({ message: "Autor atualizado com sucesso", author: updated });
    } catch (erro) {
      next(erro);
    }
  }

  static async deleteOneAuthor(req, res, next) {
    try {
      const deleted = await Authors.findByIdAndDelete(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }

      res.status(200).json({ message: "Autor excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  }

}

export default AuthorsController;
