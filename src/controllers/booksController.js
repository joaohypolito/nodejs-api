/**
 * Controller responsável por gerenciar as operações CRUD de livros
 * 
 * Este controller implementa a lógica de negócio para todas as operações
 * relacionadas a livros. Atua como camada intermediária entre as rotas
 * (booksRoutes.js) e o modelo de dados (Books.js).
 * 
 * Padrão de arquitetura:
 * Routes -> Controller -> Model -> Database
 * 
 * Fluxo de processamento de uma requisição:
 * 1. Rota recebe requisição HTTP e chama método do controller
 * 2. Controller valida e processa os dados da requisição (req)
 * 3. Controller utiliza o modelo Books para interagir com MongoDB
 * 4. Controller formata e retorna resposta HTTP (res)
 * 
 * Todos os métodos são estáticos e assíncronos, pois:
 * - Estáticos: Não precisam de instância, são chamados diretamente pela classe
 * - Assíncronos: Operações de banco de dados são assíncronas (await)
 * 
 * Tratamento de erros:
 * Cada método possui try/catch para capturar erros de validação do Mongoose
 * ou erros de conexão com o banco, retornando respostas HTTP apropriadas.
 * 
 * Métodos disponíveis:
 * - allBooks: Lista todos os documentos da coleção
 * - findBookById: Busca documento específico pelo _id
 * - addNewBook: Cria novo documento (validação automática do schema)
 * - updateOneBook: Atualiza documento existente
 * - deleteOneBook: Remove documento do banco
 */
import Books from "../models/Books.js"

class BooksController {

    static async allBooks(req, res) {
        try {
            const allBooks = await Books.find({});
            res.status(200).json(allBooks);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição` });
        }
    }

    static async findBookById (req, res) {
        try {
          const id = req.params.id;
          const bookFound = await Books.findById(id);
          res.status(200).json(bookFound);
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
        }
      };

    static async addNewBook(req, res) {
        try {
            const newBook = await Books.create(req.body);
            res.status(201).json({ message: "Livro cadastrado com sucesso", book: newBook });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Não foi possível cadastrar o livro` });
        }
    }

    static async updateOneBook (req, res) {
        try {
          const id = req.params.id;
          await Books.findByIdAndUpdate(id, req.body);
          res.status(200).json({ message: "livro atualizado" });
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na atualização` });
        }
      };

      static async deleteOneBook (req, res) {
        try {
          const id = req.params.id;
          await Books.findByIdAndDelete(id);
          res.status(200).json({ message: "livro excluído com sucesso" });
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na exclusão` });
        }
      };
      
}

export default BooksController
