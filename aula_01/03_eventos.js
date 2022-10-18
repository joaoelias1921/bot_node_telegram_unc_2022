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
            - Digo as coordenadas de latitude e longitude se você me fornecer uma localização
            - Retorno o nome e o telefone de um contato que você me fornecer
            - Ouço uma mensagem e áudio e retorno a duração dela
            - Informo a resolução das fotos que você me enviar (cuidado hein =p)
    `);
});

// tratando eventos de texto
bot.on("text", ctx => {
    const texto = ctx.update.message.text;
    console.log(texto);
    ctx.reply(`O texto recebido foi: '${texto}'`);
})

// tratando eventos de localização
bot.on("location", ctx => {
    const loc = ctx.update.message.location;
    console.log(loc);
    ctx.reply(`OK! Você está em:
        Latitude: ${loc.latitude},
        Longitude: ${loc.longitude}
    `);
});

// tratando eventos de contatos
bot.on("contact", ctx => {
    const cont = ctx.update.message.contact;
    console.log(cont);
    ctx.reply(`Legal! O telefone do ${cont.first_name}
        é: ${cont.phone_number}
    `)
});

// tratando eventos de áudio
bot.on("voice", ctx => {
    const voz = ctx.update.message.voice;
    console.log(voz);
    ctx.reply(`Áudio de ${voz.duration} segundos!`);
});

// tratando eventos de imagem/foto
bot.on("photo", ctx => {
    const foto = ctx.update.message.photo;
    console.log(foto);
    console.log(foto.length);
    foto.forEach((photo, i) => {
        ctx.reply(`A ${i}ª foto tem resolução de:
            ${photo.width} x ${photo.height}
            pixels!`);
    });
});

// tratando eventos de 'stickers'
bot.on("sticker", ctx =>{
    const stick = ctx.update.message.sticker;
    console.log(stick);
    ctx.reply(`Você enviou o ${stick.emoji}
        do conjunto ${stick.set_name}`);
});

// Iniciando o "polling" com o servidor para verificar se há
// novas mensagens e/ou conversas
bot.startPolling();