/**
 * Rotas responsáveis pelas operações CRUD de autores.
 * Mantém o padrão Routes -> Controller -> Model utilizado no restante
 * da aplicação.
 */
import express from "express";
import AuthorsController from "../controllers/authorsController.js";

const routes = express.Router();

routes.get("/authors", AuthorsController.allAuthors);
routes.get("/authors/:id", AuthorsController.findAuthorById);
routes.post("/authors", AuthorsController.addNewAuthor);
routes.put("/authors/:id", AuthorsController.updateOneAuthor);
routes.delete("/authors/:id", AuthorsController.deleteOneAuthor);

export default routes;