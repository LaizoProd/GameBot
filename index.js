const Discord = require("discord.js");
const token = require("./token.json");
const bot = new Discord.Client({ disableEveryone: true })
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
    const folEn = require("./language/en.json");
    const folFr = require("./language/fr.json");
    if (!command) return;
    if (fr.has(message.guild.id)) {
        let setLanguage = folFr
        try {
            command.run(bot, message, args, fr, en, setLanguage);
        } catch (e) {
            console.log(e)
        }
    } else {
        let Setlanguage = folEn
        try {
            command.run(bot, message, args, fr, en, Setlanguage);
        } catch (e) {
            console.log(e)
        }
    }
});

bot.login(token);