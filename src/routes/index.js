/**
 * Roteador principal da aplicação.
 * Recebe o `app` em `app.js`, registra middlewares globais e anexa os routers.
 * `BooksController` e `AuthorsController` são routers exportados de
 * `booksRoutes.js` e `authorsRoutes.js` (nomes mantidos por legado).
 */
import express from "express";
import booksRoutes from "./booksRoutes.js";
import authorsRoutes from "./authorsRoutes.js";

// Registra rota raiz e middlewares globais
const routes = (app) => {
  // Health-check simples
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));

  // Aplica express.json e monta os routers de livros e autores
  app.use(
    express.json(),
    booksRoutes,
    authorsRoutes
  );
};

export default routes;