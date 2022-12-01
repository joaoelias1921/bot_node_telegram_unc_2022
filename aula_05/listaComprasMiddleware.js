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

// criando um "Inline keyboard" dinâmico
const itemButtons = list => Markup.inlineKeyboard(
    list.map(item => Markup.button.callback(item, `remove ${item}`)),
    { columns: 3 }
);

// criando um "middleware" para verificar o 
const verificaUsuario = (ctx, next) => {
    const mesmoIdMsg = ctx.update.message
        && ctx.update.message.from.id === env.userId;
    console.log(mesmoIdMsg);
    const mesmoIdCallback = ctx.update.callback_query
        && ctx.update.callback_query.from.id === env.userId;
    console.log(mesmoIdCallback);

    if(mesmoIdMsg || mesmoIdCallback) {
        next();
    }else {
        ctx.reply("Desculpe, mas não estou autorizado a conversar com você!");
    }
}

// criando um segundo "middleware" de exemplo
const loading = ({ reply }, next) => 
    reply("Processando...").then(() => next());

bot.start(verificaUsuario, async ctx => {
    const name = ctx.update.message.from.first_name;
    await ctx.reply(`Seja bem vindo, ${name}!`);
    await ctx.reply("Escreva os itens que você deseja adicionar na lista:");
    ctx.session.lista = [];
});

bot.on("text", verificaUsuario, loading, ctx => {
    let item = ctx.update.message.text;
    ctx.session.lista.push(item);
    ctx.reply(`${item} foi adicionado a sua lista!`, itemButtons(ctx.session.lista))
});

bot.action(/remove (.+)/, verificaUsuario, ctx => {
    ctx.session.lista = ctx.session.lista.filter(item => item !== ctx.match[1]);
    ctx.reply(
        `${ctx.match[1]} foi removido da lista!`, itemButtons(ctx.session.lista)
    );
});

bot.startPolling();