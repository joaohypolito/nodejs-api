/**
 * Configuração principal da aplicação Express
 * 
 * Este arquivo centraliza a configuração da aplicação, incluindo:
 * - Conexão com o banco de dados MongoDB
 * - Inicialização do Express
 * - Registro de todas as rotas da aplicação
 * - Seed inicial de dados (população do banco)
 * 
 * Fluxo de inicialização:
 * 1. Carrega variáveis de ambiente (dotenv)
 * 2. Estabelece conexão assíncrona com MongoDB
 * 3. Configura listeners para eventos de conexão (erro e sucesso)
 * 4. Quando a conexão é estabelecida, executa seed de dados iniciais
 * 5. Inicializa a aplicação Express
 * 6. Registra todas as rotas através do módulo routes/index.js
 * 
 * Estrutura de rotas:
 * As rotas são organizadas hierarquicamente:
 * - routes/index.js: Roteador principal que centraliza todas as rotas
 *   - routes/booksRoutes.js: Rotas específicas de livros (CRUD)
 *     - controllers/booksController.js: Lógica de negócio para cada rota
 */
import "dotenv/config";
import express from "express";
import mongoConnect from "./config/dbConnect.js";
import Books from "./models/Books.js";
import { Authors } from "./models/Authors.js";
import routes from "./routes/index.js";
import errorsHandler from "./middlewares/errorsHandler.js";
import notFound404 from "./middlewares/notFound404.js";

// Estabelece conexão com MongoDB
const conexao = await mongoConnect();

// Tratamento de erros de conexão
conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

// Executa seed de dados quando a conexão é estabelecida
conexao.once("open", () => {
  console.log("Conexão ativa no app.");
  seedBaseAuthors();
  seedBaseBooks();
});

// Popula o banco com livros iniciais caso esteja vazio
async function seedBaseBooks() {
  if (await Books.countDocuments() === 0) {
    const livros = [
      {
        name: "The Lord of the Rings",
        editora: "Martin Claret",
        preco: 60,
        paginas: 375,
        author: "6924965fcd126014154e0989"
      },
      {
        name: "The Hobbit",
        editora: "Martin Claret",
        preco: 40,
        paginas: 215,
        author: "6924965fcd126014154e0989"
      }
    ];
    await Books.insertMany(livros);
  }
}

// Popula o banco com autores iniciais caso esteja vazio
async function seedBaseAuthors() {
  if (await Authors.countDocuments() === 0) {
    const livros = [
      {
        name: "J. R. R. Tolkien",
        nationality: "South Africa"
      }
    ];
    await Authors.insertMany(livros);
  }
}

// Inicializa aplicação Express e registra rotas
// A ordem de registro dos middlewares importa, reflete na ordem de execução
const app = express();
app.use(express.json());
routes(app);

app.use(notFound404);

// Middleware de erro - Centraliza e izntercepta erros lançados pela aplicação
app.use(errorsHandler);

export default app;