/**
 * Roteador principal da aplicação
 * 
 * Este arquivo centraliza o registro de todas as rotas da aplicação.
 * É o ponto de entrada para o sistema de roteamento do Express.
 * 
 * Fluxo de requisição HTTP:
 * 1. Requisição chega ao servidor Express (server.js)
 * 2. Express direciona para este módulo através de routes(app) em app.js
 * 3. Este módulo registra:
 *    - Rota raiz "/" diretamente no app
 *    - Todas as rotas de livros através do router booksRoutes.js
 * 
 * Estrutura de rotas registradas:
 * - GET  /              -> Resposta simples de teste
 * - GET  /books         -> Lista todos os livros (delegado para BooksController.allBooks)
 * - GET  /books/:id     -> Busca livro por ID (delegado para BooksController.findBookById)
 * - POST /books         -> Cria novo livro (delegado para BooksController.addNewBook)
 * - PUT  /livros/:id    -> Atualiza livro (delegado para BooksController.updateOneBook)
 * - DELETE /livros/:id  -> Remove livro (delegado para BooksController.deleteOneBook)
 * 
 * Middlewares aplicados:
 * - express.json(): Converte automaticamente o body das requisições JSON em objeto JavaScript
 * - BooksController (router): Todas as rotas definidas em booksRoutes.js
 * 
 * Nota: As rotas de livros são registradas através de um Router do Express,
 * que permite agrupar rotas relacionadas e aplicá-las como middleware.
 */
import express from "express";
import BooksController from "./booksRoutes.js";
import AuthorsController from "./authorsRoutes.js";

// Registra todas as rotas da aplicação
const routes = (app) => {
  // Rota raiz - endpoint de teste
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));

  // Middleware para parsing JSON e registro das rotas de livros
  app.use(express.json(), BooksController, AuthorsController);
};

export default routes;