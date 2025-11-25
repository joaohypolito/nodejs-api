/**
 * Configuração de conexão com MongoDB usando Mongoose
 * 
 * Este módulo encapsula a lógica de conexão com o banco de dados MongoDB.
 * Utiliza o Mongoose como ODM (Object Document Mapper) para facilitar
 * a interação com o MongoDB através de modelos e schemas.
 * 
 * Fluxo de conexão:
 * 1. Função mongoConnect() é chamada durante a inicialização da aplicação (app.js)
 * 2. Mongoose tenta conectar usando a string de conexão da variável de ambiente
 * 3. Retorna a instância da conexão (mongoose.connection) imediatamente
 * 4. A conexão real acontece de forma assíncrona em background
 * 5. Eventos de conexão são tratados em app.js através de listeners
 * 
 * String de conexão:
 * A variável DB_CONNECTION_STRING deve estar definida no arquivo .env
 * Formato: mongodb://[usuário:senha@]host[:porta]/[database]
 * Exemplo: mongodb://localhost:27017/alurabooks
 * 
 * Retorno:
 * Retorna mongoose.connection, que é uma instância de Connection do Mongoose.
 * Esta instância permite registrar listeners para eventos como:
 * - "error": Quando ocorre erro na conexão
 * - "open": Quando a conexão é estabelecida com sucesso
 * - "close": Quando a conexão é fechada
 * 
 * Nota: A conexão é reutilizada por toda a aplicação. Mongoose mantém
 * um pool de conexões automaticamente para otimizar performance.
 */
import mongoose, { mongo } from "mongoose";

// Estabelece conexão com o banco de dados MongoDB
// Retorna a instância da conexão para gerenciamento de eventos
async function mongoConnect() {
  mongoose.connect(process.env.DB_CONNECTION_STRING, {})
    .then(() => console.log("Banco de dados conectado com sucesso!"))
    .catch(err => console.error("Erro ao conectar ao MongoDB:", err));
    
  return mongoose.connection;
};

export default mongoConnect;