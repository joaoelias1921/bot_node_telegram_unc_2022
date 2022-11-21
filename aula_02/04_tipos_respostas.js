// importando as variáveis de ambiente
const env = require("../.env");

// importando a biblioteca "Telegraf"
const { Telegraf } = require("telegraf");

// Criando o objeto "bot" e o instanciando como um novo objeto da classe Telegraf
const bot = new Telegraf(env.token);

// Iniciando o bot
bot.start(async ctx => {
    const user = ctx.update.message.from;
    await ctx.replyWithHTML(`
        Destacando mensagens utilizando
        <b>HTML</b>
        <i>de várias </i> <code> formas </code>
        <pre> possíveis </pre>
        <a href="https://www.google.com">
            Google
        </a>`);

    //respondendo com Markdown
    await ctx.replyWithMarkdownV2(
        'Destacando mensagens utilizando '
        + '*Markdown*'
        + ' _de várias_'
        + ' `formas` ```possíveis```'
        + ' [Google](http://www.google.com)'
    );

    // respondendo com imagens "remotas"
    await ctx.replyWithPhoto({
        url: "https://www.gstatic.com/webp/gallery/1.jpg"
    });

    // respondendo com imagem local
    await ctx.replyWithPhoto({
        source: `${__dirname}/wallpaper.jpg`,
    });

    // respondendo com imagens "remotas"
    await ctx.replyWithPhoto({
        url: "https://www.gstatic.com/webp/gallery/1.jpg",
        caption: "Saca só essa imagem"
    });

    // respondendo com vídeos "remotos"
    await ctx.replyWithVideo({
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    });
});

// Iniciando o "polling" com o servidor para verificar se há
// novas mensagens e/ou conversas
bot.startPolling();