const Discord = require("discord.js");

module.exports = class themind {
    constructor() {
        this.name = 'configuration',
            this.alias = ['config'],
            this.usage = '.configuration'
    }
    run(bot, message, args, fr, en, setLanguage) {
        message.delete()
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const config1 = new Discord.RichEmbed()
                .setTitle("Configuration")
                .setColor("#ff0000")
                .setFooter("GameBot by Laizo", bot.user.avatarURL)
                .addField("Language",
                    "By adding a reaction you can choose the language of the bot on this server : \n 🇬🇧 = English \n 🇨🇵 = Français")
                .setDescription(`By doing this command the role "pban" was created, this one allows to use the command .pban`)
            message.channel.send(config1)
                .then(embedMessage => {
                    embedMessage.react("🇨🇵");
                    embedMessage.react("🇬🇧");
                    bot.on("messageReactionAdd", function (reaction, user) {
                        if (embedMessage.id === reaction.message.id) {
                            if (reaction.emoji.name === "🇨🇵") {
                                fr.add(message.guild.id);
                                if (en.has(message.guild.id)) {
                                    en.delete(message.guild.id);
                                }
                            } else {
                                en.add(message.guild.id);
                                if (fr.has(message.guild.id)) {
                                    fr.delete(message.guild.id);
                                }
                            }
                        }
                    })
                });
            if (message.guild.roles.find(role => role.name === "pban") == undefined) {
                console.log(`pban created`)
                message.member.guild.createRole({
                    name: `pban`
                })
            }
        }
    }
};
