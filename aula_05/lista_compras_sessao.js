// importando as variáveis de ambiente
const env = require('../.env');

// importando a biblioteca 'Telegraf','Markup'
const { Telegraf, Markup } = require('telegraf');

// Importando a biblitoeca "Telegraf Session"
const LocalSession = require("telegraf-session-local");

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token);

// Definindo que o bot utilizará o armazenamento em sessão
bot.use(new LocalSession({ database: "example_db.json" }).middleware());

const itemButtons = list => Markup.inlineKeyboard(
    list.map(item => Markup.button.callback(item, `remove ${item}`)),
    { columns: 3 }
)

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name;
    await ctx.reply(`Seja bem vindo ${name}!`);
    await ctx.reply("Por favor, escreva os itens que deseja adicionar...\n");
    ctx.session.list = [];
});

bot.on("text", (ctx, next) => {
    let item = ctx.update.message.text;
    ctx.session.list.push(item);
    ctx.reply(`O item ${item} foi adicionado à sua lista!`, itemButtons(ctx.session.list));
});

bot.action(/remove (.+)/, ctx => {
    ctx.session.list = ctx.session.list.filter(item => item !== ctx.match[1]);
    ctx.reply(`${ctx.match[1]} removido da lista!`, itemButtons(ctx.session.list));
});

bot.startPolling();