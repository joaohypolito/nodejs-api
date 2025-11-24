/**
 * Controller responsável por gerenciar as operações CRUD de autores.
 * Segue o padrão Routes -> Controller -> Model, isolando a lógica de negócio
 * e centralizando o acesso ao MongoDB.
 */
import { Authors } from "../models/Authors.js";

class AuthorsController {

    static async allAuthors(req, res) {
        try {
            const authors = await Authors.find({});
            res.status(200).json(authors);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição` });
        }
    }

    static async findAuthorById(req, res) {
        try {
            const authorFound = await Authors.findById(req.params.id);
            if (!authorFound) {
                return res.status(404).json({ message: "Autor não encontrado" });
            }
            res.status(200).json(authorFound);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do autor` });
        }
    }

    static async addNewAuthor(req, res) {
        try {
            const newAuthor = await Authors.create(req.body);
            res.status(201).json({ message: "Autor cadastrado com sucesso", author: newAuthor });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Não foi possível cadastrar o autor` });
        }
    }

    static async updateOneAuthor(req, res) {
        try {
            const updated = await Authors.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) {
                return res.status(404).json({ message: "Autor não encontrado" });
            }
            res.status(200).json({ message: "Autor atualizado com sucesso", author: updated });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização do autor` });
        }
    }

    static async deleteOneAuthor(req, res) {
        try {
            const deleted = await Authors.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: "Autor não encontrado" });
            }
            res.status(200).json({ message: "Autor excluído com sucesso" });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na exclusão do autor` });
        }
    }

}

export default AuthorsController;
