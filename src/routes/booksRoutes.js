/**
 * Definição das rotas relacionadas a livros
 * 
 * Este arquivo mapeia as rotas HTTP para operações CRUD de livros.
 * Utiliza o Router do Express para criar um grupo de rotas que será
 * registrado no roteador principal (routes/index.js).
 * 
 * Fluxo de uma requisição:
 * 1. Cliente faz requisição HTTP (ex: GET /books)
 * 2. Express recebe no servidor e direciona para este router
 * 3. Router verifica qual rota corresponde ao path e método HTTP
 * 4. Executa o método correspondente do BooksController
 * 5. Controller acessa o modelo Books para interagir com MongoDB
 * 6. Controller retorna resposta JSON ao cliente
 * 
 * Rotas disponíveis:
 * - GET    /books       -> Retorna array com todos os livros
 * - GET    /books/:id   -> Retorna um livro específico pelo ID do MongoDB
 * - POST   /books       -> Cria novo livro (body deve conter dados do livro)
 * - PUT    /livros/:id  -> Atualiza livro existente (body contém campos a atualizar)
 * - DELETE /livros/:id  -> Remove livro do banco de dados
 * 
 * Parâmetros:
 * - :id -> ID do documento no MongoDB (ObjectId)
 * 
 * Body esperado (POST/PUT):
 * {
 *   "name": "Nome do Livro",
 *   "editora": "Nome da Editora",
 *   "preco": 29.90,
 *   "paginas": 300
 * }
 * 
 * Todas as rotas são tratadas por métodos estáticos da classe BooksController,
 * que encapsula a lógica de negócio e acesso ao banco de dados.
 */
import express from 'express';
import BooksController from '../controllers/booksController.js';

// Cria um router do Express para agrupar rotas relacionadas
const routes = express.Router();

routes.get("/books", BooksController.allBooks);
routes.get("/books/:id", BooksController.findBookById);
routes.post("/books", BooksController.addNewBook);
routes.put("/livros/:id", BooksController.updateOneBook);
routes.delete("/livros/:id", BooksController.deleteOneBook);

export default routes;