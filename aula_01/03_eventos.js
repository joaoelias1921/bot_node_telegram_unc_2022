// importando as variáveis de ambiente
const env = require("../.env");

// importando a biblioteca "Telegraf"
const { Telegraf } = require("telegraf");

// Criando o objeto "bot" e o instanciando como um novo objeto da classe Telegraf
const bot = new Telegraf(env.token);

// Iniciando o bot
bot.start(ctx => {
    const name = ctx.update.message.from.first_name;
    ctx.reply(`Seja bem-vindo ${name}!
        Eu sou um 'bot' em treinamento!
        Por enquanto eu:
            - Repito o que você digita;
            - Digo as coordenadas de latitude e longitude se
            - Retorno o nome e o telefone de um contato que
            - Ouço uma mensagem e áudio e retorno a duração
            - Informo a resolução das fotos que você me enviar
    `);
});

// Iniciando o "polling" com o servidor para verificar se há
// novas mensagens e/ou conversas
bot.startPolling();