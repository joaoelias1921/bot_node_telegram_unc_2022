// importando as variáveis de ambiente
const env = require("../.env");

// importando a biblioteca "Telegraf"
const { Telegraf } = require("telegraf");

// Criando o objeto "bot" e o instanciando como um novo objeto da classe Telegraf
const bot = new Telegraf(env.token);

// Iniciando o bot
bot.start(ctx => {
    const from = ctx.update.message.from;
    from.id !== 5792995783 
        ?
        ctx.reply("Não te conheço mermão")
        :
        ctx.reply(`Fala ${from.first_name.split(" ")[0]}, susse?`);
});

// Iniciando o "polling" com o servidor para verificar se há
// novas mensagens e/ou conversas
bot.startPolling();