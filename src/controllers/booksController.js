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
import { Books } from "../models/index.js";
import { Authors } from "../models/index.js";

class BooksController {

  static async allBooks(req, res, next) {
    try {
      const searchBooks = Books.find();

      req.result = searchBooks;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async findBookById(req, res, next) {
    try {
      const id = req.params.id;
      const bookFound = await Books
        .findById(
          id,
          {},
          { autopopulate: false }
        )
        .populate("author");

      res.status(200).json(bookFound);
    } catch (erro) {
      next(erro);
    }
  };

  static async addNewBook(req, res, next) {
    try {
      let newBook = new Books(req.body);

      const res = await newBook.save();

      // const authorFound = await Authors.findById(newBook.author);
      // const fullBook = { ...newBook, author: { ...authorFound._doc } };
      // const bookCreated = await Books.create(fullBook);

      res.status(201).send(res.toJSON());
    } catch (erro) {
      next(erro);
    }
  }

  static async updateOneBook(req, res, next) {
    try {
      const id = req.params.id;
      await Books.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado" });
    } catch (erro) {
      next(erro);
    }
  };

  static async deleteOneBook(req, res, next) {
    try {
      const id = req.params.id;
      await Books.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluído com sucesso" });
    } catch (erro) {
      next(erro);
    }
  };

  static async filterBooks(req, res, next) {
    try {
      const searchFilter = await procesSearch(req.query);

      if (searchFilter !== null) {
        const booksFound = Books
          .find(searchFilter);

        req.result = booksFound;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }

}

async function procesSearch(q) {
  const { editora, name, minPages, maxPages, author } = q;

  // Exemplo de uso de regex do js, bastaria atribuir o valor dele no search.name
  // const regex = new RegExp(name, "i");

  let qParams = {};

  if (editora) qParams.editora = editora;

  if (name) qParams.name = { $regex: name, $options: "i" }; // Regex do mongoDB

  // TODO: Tratar min de páginas maior que max páginas e vice versa
  if (minPages || maxPages) qParams.paginas = {};
  if (minPages) qParams.paginas.$gte = minPages;
  if (maxPages) qParams.paginas.$lte = maxPages;

  if (author) {
    const name = await Authors.findOne({ name: author });

    if (name !== null) {
      qParams.author = name._id;
    } else {
      qParams = null;
    }
  };

  return qParams;
}

export default BooksController;
