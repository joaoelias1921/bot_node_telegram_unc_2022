// importando as variáveis de ambiente
const env = require("../.env");

// importando a biblioteca "Telegraf"
const { Telegraf } = require("telegraf");

// importando a biblitoeca "moment"
const moment = require("moment");

// Criando o objeto "bot" e o instanciando como um novo objeto da classe Telegraf
const bot = new Telegraf(env.token);

// utilizando o "hears" com expressão simples
bot.hears("pizza", ctx => {
    ctx.reply("Quero de 4 queijos!");
});

// utilizando o "hears" com array de expressões
bot.hears(["chuchu", "moela", "figado"], ctx => {
    ctx.reply("Obrigado mas não vou querer!");
});

// utilizando o "hears" para emojis
bot.hears("🐷", ctx => {
    ctx.reply("Torresmoooooooooo");
});

// utilizando o "hears" com expressões regulares
bot.hears(/burguer/i, ctx => {
    ctx.reply("Hamburguers... X-Burguer... X-Salada");
});

// utilizando o "hears" com datas DD/MM/YYYY
bot.hears(/(\d{2}\/\d{2}\/\d{4})/g, ctx => {
    moment.locale("pt-BR");
    const data = moment(ctx.match[1], "DD/MM/YYYY");
    ctx.reply(`${ctx.match[1]} cai em ${data.format("dddd")}`);
});

// Iniciando o "polling" com o servidor para verificar se há
// novas mensagens e/ou conversas
bot.startPolling();