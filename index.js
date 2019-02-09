const Discord = require("discord.js");
const bot = new Discord.Client()
const { CommandHandler } = require("djs-commands")
const CH = new CommandHandler({
    folder: __dirname + '/commands/',
    prefix: ['.', ';']
});
const fr = new Set();
const en = new Set();

bot.on("ready", async () => {
    console.log(`${bot.user.username} launched`)
    bot.user.setActivity("a lot of games ! (.help)")
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let args = message.content.split(" ");
    let command = CH.getCommand(args[0]);
    if (!command) return;
    let setLanguage;
    if (fr.has(message.guild.id)) {
        setLanguage = require("./language/fr.json");
    } else {
        setLanguage = require("./language/en.json");
    }
    try {
        command.run(bot, message, args, fr, en, setLanguage);
    } catch (e) {
        console.log(e)
    }
}
);

bot.login(require("./token.json"));
