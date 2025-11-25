/**
 * Modelo de dados para livros usando Mongoose Schema
 * 
 * Este arquivo define o schema e o modelo Mongoose para a entidade "livros".
 * O Mongoose Schema é uma estrutura que define a forma dos documentos
 * que serão armazenados na coleção "books" do MongoDB.
 * 
 * Fluxo de uso do modelo:
 * 1. Controller (booksController.js) importa este modelo
 * 2. Controller utiliza métodos do modelo para interagir com o banco:
 *    - Books.find(): Busca documentos
 *    - Books.findById(): Busca por ID
 *    - Books.create(): Cria novo documento
 *    - Books.findByIdAndUpdate(): Atualiza documento
 *    - Books.findByIdAndDelete(): Remove documento
 * 3. Mongoose valida os dados contra o schema antes de salvar
 * 4. Mongoose converte automaticamente entre objetos JavaScript e documentos BSON
 * 
 * Schema definido:
 * - id: ObjectId do MongoDB (gerado automaticamente se não fornecido)
 * - name: String obrigatória (nome do livro)
 * - editora: String opcional (editora do livro)
 * - preco: Number opcional (preço do livro)
 * - paginas: Number opcional (número de páginas)
 * 
 * Validações automáticas:
 * - name é obrigatório (required: true) - Mongoose rejeita documentos sem este campo
 * - Tipos são validados automaticamente (String, Number, ObjectId)
 * 
 * Coleção no MongoDB:
 * O modelo é mapeado para a coleção "books" (pluralização automática do Mongoose).
 * Se a coleção não existir, será criada automaticamente na primeira inserção.
 * 
 * Opções do schema:
 * - versionKey: false - Remove o campo __v que o Mongoose adiciona por padrão
 *   para controle de versão de documentos
 */
import mongoose from "mongoose";

// Define o schema do documento de livros no MongoDB
const booksSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { 
    type: String, 
    required: [true, "O título do livro é obrigatório."]
  },
  editora: { 
    type: String,
    required: [true, "A editora é obrigatória."] 
  },
  preco: { type: Number },
  paginas: { 
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}"],
    max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}"]
  },
  // O campo abaixo armazena apenas o ObjectId e referencia o model Authors
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "authors",
    required: [true, "O(A) autor(a) é obrigatório"]
  },
}, {versionKey: false}); // Desabilita o campo __v do Mongoose

// Cria e exporta o modelo Books baseado no schema
const Books = mongoose.model("books", booksSchema);

export default Books;