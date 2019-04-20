const Discord = require("discord.js");

module.exports = class help {
    constructor() {
        this.name = 'help',
            this.alias = ['h', 'aide', 'a'],
            this.usage = '.help'
    }
    run(bot, message, args, setLanguage, db) {
        message.delete()
        if (db.get(message.guild.id).__wrapped__[message.guild.id] === "fr" || db.get(message.guild.id).__wrapped__[message.guild.id] === "en") {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                const help = new Discord.RichEmbed()
                    .setTitle(setLanguage.hTitle)
                    .setColor("#ffffff")
                    .setFooter("GameBot by Laizo", bot.user.avatarURL)
                    .addField(setLanguage.hDesciption,
                        setLanguage.hGames)
                    .addField(setLanguage.hCommandsTitle,
                        setLanguage.hCommands)
                message.channel.send(help)
            } else {
                const helpadmin = new Discord.RichEmbed()
                    .setTitle(setLanguage.hAdminTitle)
                    .setColor("#ff0000")
                    .setFooter("GameBot by Laizo", bot.user.avatarURL)
                    .addField(setLanguage.hDesciption,
                        setLanguage.hGames)
                    .addField(setLanguage.hCommandsTitle,
                        setLanguage.hCommandsAdmin)
                message.channel.send(helpadmin)
            }
        } else {
            message.channel.send("The server is not configured, an administrator must perform : .config")
        }
    }
};
