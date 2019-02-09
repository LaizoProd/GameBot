const Discord = require("discord.js");

module.exports = class themind {
    constructor() {
        this.name = 'configuration',
            this.alias = ['config'],
            this.usage = '.configuration'
    }
    run(bot, message, args, fr, en, setLanguage) {
        message.delete()
        if (!fr.has(message.guild.id) || !en.has(message.guild.id)) {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                const config1 = new Discord.RichEmbed()
                    .setTitle("Configuration")
                    .setColor("#ff0000")
                    .setFooter("GameBot by Laizo", bot.user.avatarURL)
                    .addField("Language",
                        "By adding a reaction you can choose the language of the bot on this server : \n 🇬🇧 = English \n 🇨🇵 = Français")
                    //"En ajoutant une réaction sous ce message vous pouvez activer, respectivement :\n \n ⚫ aucun channel de partie, les invitations sont envoyées dans le channel ou la commande a été effectuée.\n \n 🔵 un channel de partie, les invitations sont toutes envoyées dans ce channel\n \n ⚪ un channel de partie par jeu, les invitations sont envoyées dans le channel correspondant au jeu ")
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
                console.log(`Role de ban créé`)
                message.member.guild.createRole({
                    name: `pban`
                })
            }
        }
    }
};