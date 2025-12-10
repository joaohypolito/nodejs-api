# 📚 API REST - Gerenciamento de Livros e Autores

API REST desenvolvida em Node.js com Express e MongoDB para gerenciamento de livros e autores. A aplicação implementa operações CRUD completas, sistema de paginação, filtros avançados e tratamento centralizado de erros.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express 5.1.0** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose 8.20.0** - ODM (Object Document Mapper) para MongoDB
- **dotenv** - Gerenciamento de variáveis de ambiente
- **ESLint** - Linter para qualidade de código

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (local ou remoto)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd back-end-node
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
DB_CONNECTION_STRING=mongodb://localhost:27017/alurabooks
```

**Variáveis de ambiente:**
- `PORT` - Porta em que o servidor irá rodar (padrão: 3000)
- `DB_CONNECTION_STRING` - String de conexão com o MongoDB
  - Formato: `mongodb://[usuário:senha@]host[:porta]/[database]`
  - Exemplo local: `mongodb://localhost:XXXXX/alurabooks`
  - Exemplo remoto: `mongodb+srv://usuario:senha@cluster.mongodb.net/alurabooks`

## ▶️ Como Executar

### Modo Desenvolvimento
```bash
npm run dev
```

O servidor será iniciado com `nodemon`, reiniciando automaticamente a cada alteração no código.

### Modo Produção
```bash
node server.js
```

O servidor estará disponível em `http://localhost:3000` (ou na porta configurada no `.env`).

## 📁 Estrutura do Projeto

```
back-end-node/
├── src/
│   ├── app.js                 # Configuração principal da aplicação Express
│   ├── config/
│   │   └── dbConnect.js        # Configuração de conexão com MongoDB
│   ├── controllers/
│   │   ├── authorsController.js
│   │   └── booksController.js
│   ├── errors/
│   │   ├── baseError.js
│   │   ├── notFound.js
│   │   ├── validationError.js
│   │   └── wrongRequisition.js
│   ├── middlewares/
│   │   ├── errorsHandler.js   # Tratamento centralizado de erros
│   │   ├── notFound404.js     # Middleware para rotas não encontradas
│   │   └── pagination.js      # Middleware de paginação
│   ├── models/
│   │   ├── Authors.js
│   │   ├── Books.js
│   │   └── index.js
│   └── routes/
│       ├── authorsRoutes.js
│       ├── booksRoutes.js
│       └── index.js            # Roteador principal
├── server.js                   # Ponto de entrada da aplicação
├── package.json
├── eslint.config.js
└── README.md
```

## 🏗️ Arquitetura

A aplicação segue o padrão **MVC (Model-View-Controller)** com separação clara de responsabilidades:

- **Routes** → Define os endpoints e métodos HTTP
- **Controllers** → Contém a lógica de negócio
- **Models** → Define os schemas e interage com o banco de dados
- **Middlewares** → Processa requisições e respostas (validação, paginação, erros)

### Fluxo de uma Requisição

1. Cliente faz requisição HTTP → `server.js`
2. Express roteia → `routes/index.js`
3. Router específico → `routes/booksRoutes.js` ou `routes/authorsRoutes.js`
4. Controller processa → `controllers/booksController.js` ou `controllers/authorsController.js`
5. Model interage com MongoDB → `models/Books.js` ou `models/Authors.js`
6. Resposta retornada ao cliente

## 📡 Endpoints da API

### 🏠 Health Check

- **GET** `/` - Retorna mensagem de status da API

### 📖 Livros

#### Listar todos os livros (com paginação)
- **GET** `/books`
- **Query Parameters:**
  - `qLimit` - Número de itens por página (padrão: 5)
  - `qPages` - Número da página (padrão: 1)
  - `sort` - Campo e ordem de ordenação (formato: `campo:ordem`, padrão: `_id:-1`)
- **Exemplo:** `GET /books?qLimit=10&qPages=1&sort=name:1`

#### Buscar livros com filtros (com paginação)
- **GET** `/books/search`
- **Query Parameters:**
  - `name` - Busca por nome (busca parcial, case-insensitive)
  - `editora` - Filtra por editora (exato)
  - `minPages` - Número mínimo de páginas
  - `maxPages` - Número máximo de páginas
  - `author` - Nome do autor (busca pelo nome e retorna livros do autor)
  - `qLimit`, `qPages`, `sort` - Parâmetros de paginação (mesmos do endpoint anterior)
- **Exemplo:** `GET /books/search?name=ring&minPages=200&maxPages=400&qLimit=5`

#### Buscar livro por ID
- **GET** `/books/:id`
- **Parâmetros:**
  - `id` - ID do livro (ObjectId do MongoDB)

#### Criar novo livro
- **POST** `/books`
- **Body (JSON):**
```json
{
  "name": "Nome do Livro",
  "editora": "Nome da Editora",
  "preco": 29.90,
  "paginas": 300,
  "author": "ObjectId_do_Autor"
}
```
- **Campos obrigatórios:** `name`, `editora`, `author`

#### Atualizar livro
- **PUT** `/livros/:id`
- **Parâmetros:**
  - `id` - ID do livro (ObjectId do MongoDB)
- **Body (JSON):** Campos a serem atualizados

#### Deletar livro
- **DELETE** `/livros/:id`
- **Parâmetros:**
  - `id` - ID do livro (ObjectId do MongoDB)

### 👤 Autores

#### Listar todos os autores (com paginação)
- **GET** `/authors`
- **Query Parameters:** Mesmos do endpoint de livros (`qLimit`, `qPages`, `sort`)

#### Buscar autor por ID
- **GET** `/authors/:id`
- **Parâmetros:**
  - `id` - ID do autor (ObjectId do MongoDB)

#### Criar novo autor
- **POST** `/authors`
- **Body (JSON):**
```json
{
  "name": "Nome do Autor",
  "nationality": "Nacionalidade"
}
```
- **Campos obrigatórios:** `name`

#### Atualizar autor
- **PUT** `/authors/:id`
- **Parâmetros:**
  - `id` - ID do autor (ObjectId do MongoDB)
- **Body (JSON):** Campos a serem atualizados

#### Deletar autor
- **DELETE** `/authors/:id`
- **Parâmetros:**
  - `id` - ID do autor (ObjectId do MongoDB)

## 🔗 Relacionamentos

O modelo `Books` possui um relacionamento com `Authors` através de referência (não embutido):

- Cada livro possui um campo `author` que armazena o `ObjectId` do autor
- Ao buscar um livro por ID, o autor é automaticamente populado (populate)
- Isso evita duplicação de dados e mantém a integridade referencial

## ⚠️ Tratamento de Erros

A aplicação possui um sistema centralizado de tratamento de erros através do middleware `errorsHandler.js`:

### Tipos de Erro Tratados

1. **CastError** (400) - Quando um ID ou valor não pode ser convertido para o tipo esperado
   - Mensagem: "Um ou mais dados fornecidos estão incorretos."

2. **ValidationError** (400) - Quando dados não passam na validação do schema
   - Mensagem: Lista de todos os erros de validação encontrados

3. **NotFound** (404) - Quando um recurso não é encontrado
   - Mensagem: "Autor(a) não encontrado(a)" ou similar

4. **Erro Genérico** (500) - Para qualquer outro erro não previsto
   - Mensagem: Mensagem do erro original

### Estrutura de Resposta de Erro

```json
{
  "msg": "Mensagem de erro",
  "status": 400
}
```

## 📝 Validações

### Modelo Books
- `name` - Obrigatório, String
- `editora` - Obrigatório, String
- `author` - Obrigatório, ObjectId (referência ao model Authors)
- `preco` - Opcional, Number
- `paginas` - Opcional, Number

### Modelo Authors
- `name` - Obrigatório, String
- `nationality` - Opcional, String

## 🌱 Seed de Dados

A aplicação possui um sistema de seed automático que popula o banco de dados com dados iniciais caso as coleções estejam vazias:

- **Autores:** J. R. R. Tolkien
- **Livros:** The Lord of the Rings, The Hobbit

O seed é executado automaticamente quando a conexão com o MongoDB é estabelecida.

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com nodemon
- `npm test` - Executa os testes (ainda não implementado)

## 📚 Exemplos de Uso

### Criar um autor
```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "George R. R. Martin",
    "nationality": "American"
  }'
```

### Criar um livro
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A Game of Thrones",
    "editora": "Bantam Books",
    "preco": 45.90,
    "paginas": 694,
    "author": "ObjectId_do_Autor"
  }'
```

### Buscar livros com filtros
```bash
curl "http://localhost:3000/books/search?name=thrones&minPages=500&qLimit=10"
```

### Listar livros com paginação
```bash
curl "http://localhost:3000/books?qLimit=5&qPages=1&sort=name:1"
```

## 🔒 Segurança

⚠️ **Nota:** Esta é uma API de exemplo para fins educacionais. Para uso em produção, considere implementar:

- Autenticação e autorização (JWT, OAuth, etc.)
- Rate limiting
- Validação mais robusta de entrada
- Sanitização de dados
- HTTPS
- CORS configurado adequadamente

## 📄 Licença

ISC

## 👨‍💻 Autor

Desenvolvido como parte do curso de Node.js da Alura.

---

**Versão:** 1.0.0

