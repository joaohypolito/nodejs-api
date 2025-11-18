/**
 * Ponto de entrada da aplicação Node.js/Express
 * 
 * Este arquivo é responsável por inicializar o servidor HTTP da aplicação.
 * 
 * Fluxo de execução:
 * 1. Carrega as variáveis de ambiente do arquivo .env usando dotenv
 * 2. Importa a aplicação Express configurada em src/app.js
 *    (que já possui todas as rotas, middlewares e conexão com banco configurados)
 * 3. Inicia o servidor HTTP na porta especificada pela variável de ambiente PORT
 * 
 * A aplicação ficará escutando requisições HTTP na porta configurada até ser encerrada.
 */
import "dotenv/config";
import app from "./src/app.js";

// Inicia o servidor na porta definida nas variáveis de ambiente
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}.`)
});