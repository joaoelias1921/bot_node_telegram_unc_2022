// importando as variáveis de ambiente
const env = require('../.env')

// importando a biblioteca 'Telegraf','Markup'
const { Telegraf, Markup } = require('telegraf')

/**
 * criando o objeto 'bot' e o instanciando
 * como um novo objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token)

// Criando uma variável tipo Array para receber os itens da lista
let list = []

// Criando um 'Inline keyboard' dinâmico
const itemButtons = () => Markup.inlineKeyboard(
    list.map(item => Markup.button.callback(item, `remove ${item}`)),
    { columns: 3 }
)

// Iniciando o bot
bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo ${name}!`)
    await ctx.reply('Por favor, escreva os itens que deseja adicionar...\n')
})

// Obtendo o item e o transfomando em um botão da lista
bot.on('text', ctx => {
    list.push(ctx.update.message.text)
    ctx.reply(`O item ${ctx.update.message.text} foi adicionado à lista`, itemButtons())
})

// Removendo os itens da lista quando clicar no botão
bot.action(/remove (.+)/, ctx => {
    list = list.filter(item => item !==ctx.match[1])
    ctx.reply(`O item ${ctx.match[1]} foi removido da sua lista`, itemButtons())
})

bot.startPolling()