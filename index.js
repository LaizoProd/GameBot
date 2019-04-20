const Discord = require("discord.js");
const bot = new Discord.Client()
const { CommandHandler } = require("djs-commands")
const CH = new CommandHandler({
    folder: __dirname + '/commands/',
    prefix: ['.']
});
const low = require("lowdb")
const FileSync = require("lowdb/adapters/fileSync")
const adapter = new FileSync("ServerLanguage.json")
const db = low(adapter);
db.defaults({})
    .write()

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
    console.log(db.get(message.guild.id).__wrapped__[message.guild.id])
    if (db.get(message.guild.id).__wrapped__[message.guild.id] === "fr") {
        setLanguage = require("./language/fr.json");
    } else if (db.get(message.guild.id).__wrapped__[message.guild.id] === "en"){
        setLanguage = require("./language/en.json");
    }
    try {
        command.run(bot, message, args, setLanguage, db);
    } catch (e) {
        console.log(e)
    }
}
);

bot.login(require("./token.json"));
