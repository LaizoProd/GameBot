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
            const language = new Discord.RichEmbed()
                .setTitle("Configuration")
                .setColor("#ff0000")
                .setFooter("GameBot by Laizo", bot.user.avatarURL)
                .addField("Language",
                    "By adding a reaction you can choose the language of the bot on this server : \n 🇬🇧 = English \n 🇨🇵 = Français")
            message.channel.send(language)
                .then(embedMessage => embedMessage.react("🇬🇧").then(() => embedMessage.react("🇨🇵"))
                    .then(bot.on("messageReactionAdd", function (reaction, user) {
                        if (embedMessage.id === reaction.message.id) {
                            if (user.id == "540103334309265408") {
                            } else {
                                reaction.remove(user);
                                if (reaction.message.guild.members.get(user.id).hasPermission("ADMINISTRATOR")) {
                                    let setLanguage;
                                    fr.delete(message.guild.id);
                                    en.delete(message.guild.id);
                                    if (reaction.emoji.name === "🇨🇵") {
                                        setLanguage = require("../language/fr.json");
                                        fr.add(message.guild.id);
                                    } else {
                                        setLanguage = require("../language/en.json");
                                        en.add(message.guild.id);
                                    }
                                    const newEmbed = new Discord.RichEmbed()
                                        .setTitle("Configuration")
                                        .setColor("#ff0000")
                                        .setFooter("GameBot by Laizo", bot.user.avatarURL)
                                        .addField("Language",
                                            setLanguage.Language)
                                    reaction.message.edit(newEmbed)
                                    setTimeout(function () {
                                        const pbanembed = new Discord.RichEmbed()
                                            .setTitle("Configuration")
                                            .setColor("#ff0000")
                                            .setFooter("GameBot by Laizo", bot.user.avatarURL)
                                            .addField("Ban role",
                                                setLanguage.cEmbedPban)
                                        message.channel.send(pbanembed)
                                            .then(embedMessage => embedMessage.react("✅").then(() => embedMessage.react("❎"))
                                                .then(bot.on("messageReactionAdd", function (reaction, user) {
                                                    if (embedMessage.id === reaction.message.id) {
                                                        if (user.id == "540103334309265408") {
                                                        } else {
                                                            reaction.remove(user);
                                                            if (reaction.message.guild.members.get(user.id).hasPermission("ADMINISTRATOR")) {
                                                                if (reaction.emoji.name === "✅") {
                                                                    if (message.guild.roles.find(role => role.name === "pban") == undefined) {
                                                                        console.log(`pban created`)
                                                                        message.member.guild.createRole({
                                                                            name: `pban`
                                                                        })
                                                                    }
                                                                } else {
                                                                    if (message.guild.roles.find(role => role.name === "pban")) {
                                                                        console.log(`pban deleted`)
                                                                        message.member.guild.roles.find(role => role.name === "pban").delete();
                                                                    }
                                                                }
                                                                setTimeout(function () {
                                                                    const channel = new Discord.RichEmbed()
                                                                        .setTitle("Configuration")
                                                                        .setColor("#ff0000")
                                                                        .setFooter("GameBot by Laizo", bot.user.avatarURL)
                                                                        .addField(setLanguage.cEmbedChannelTitle,
                                                                            setLanguage.cEmbedChannel)
                                                                    message.channel.send(channel)
                                                                        .then(embedMessage => embedMessage.react("✅").then(() => embedMessage.react("❎"))
                                                                            .then(bot.on("messageReactionAdd", function (reaction, user) {
                                                                                if (embedMessage.id === reaction.message.id) {
                                                                                    if (user.id == "540103334309265408") {
                                                                                    } else {
                                                                                        reaction.remove(user);
                                                                                        if (reaction.message.guild.members.get(user.id).hasPermission("ADMINISTRATOR")) {
                                                                                            if (reaction.emoji.name === "✅") {
                                                                                                if (message.guild.channels.find(channel => channel.name === "Parties") == null) {
                                                                                                    console.log(`Channel created`)
                                                                                                    message.guild.createChannel("Parties", "text", [{
                                                                                                        id: message.guild.roles.find(role => role.name === `@everyone`).id,
                                                                                                        allow: ['VIEW_CHANNEL'],
                                                                                                        deny: ['SEND_MESSAGES']
                                                                                                    }]);
                                                                                                    setTimeout(function () {
                                                                                                        console.log(message.guild.channels.find(channel => channel.name === "Parties"))
                                                                                                    }, 1000);
                                                                                                }
                                                                                            } else {
                                                                                                if (message.guild.channels.find(channel => channel.name === "Parties")) {
                                                                                                    console.log(`channel deleted`)
                                                                                                    message.member.guild.channels.find(channel => channel.name === "Parties").delete();
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }))
                                                                        )
                                                                }, 1000);
                                                            }
                                                        }
                                                    }
                                                }))
                                            )
                                    }, 1000);
                                }
                            }
                        }
                    }))
                )
        }
    }
}
