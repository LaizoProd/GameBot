const Discord = require("discord.js");

module.exports = class themind {
    constructor() {
        this.name = 'help',
            this.alias = ['h', 'aide', 'a'],
            this.usage = '.help'
    }
    run(bot, message, args, fr, en, setLanguage) {
        message.delete()
        if (fr.has(message.guild.id) || en.has(message.guild.id)) {
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
            message.channel.send("The server is not configured, perform : .config")
        }
    }
};