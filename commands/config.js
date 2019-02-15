const Discord = require("discord.js");

module.exports = class themind {
    constructor() {
        this.name = 'configuration',
            this.alias = ['config'],
            this.usage = '.configuration'
    }
    run(bot, message, args, fr, en, setLanguage) {
        var embedRole = 1;
        var embedChannel = 1;
        var editRole;
        var editChannel;
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
                                    reaction.message.embeds[0].fields[0].value = setLanguage.Language;
                                    reaction.message.edit(new Discord.RichEmbed(reaction.message.embeds[0]));
                                    setTimeout(function () {
                                        if (embedRole == 1) {
                                            embedRole += 1;
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
                                                            editRole = embedMessage;
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
                                                                        if (embedChannel == 1) {
                                                                            embedChannel += 1;
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
                                                                                            editChannel = embedMessage;
                                                                                            if (user.id == "540103334309265408") {
                                                                                            } else {
                                                                                                reaction.remove(user);
                                                                                                if (reaction.message.guild.members.get(user.id).hasPermission("ADMINISTRATOR")) {
                                                                                                    if (reaction.emoji.name === "✅") {
                                                                                                        if (message.member.guild.channels.find(channel => channel.name === "parties") == null) {
                                                                                                            console.log(`Channel created`)
                                                                                                            message.guild.createChannel("parties", "text", [{
                                                                                                                id: message.member.guild.roles.find(role => role.name === `@everyone`).id,
                                                                                                                allow: ['VIEW_CHANNEL'],
                                                                                                                deny: ['SEND_MESSAGES']
                                                                                                            }]);
                                                                                                        }
                                                                                                    } else {
                                                                                                        if (message.member.guild.channels.find(channel => channel.name === "parties")) {
                                                                                                            console.log(`channel deleted`)
                                                                                                            message.member.guild.channels.find(channel => channel.name === "parties").delete();
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }))
                                                                                )
                                                                            } else {
                                                                                editChannel.embeds[0].fields[0].value = setLanguage.cEmbedChannel;
                                                                                editChannel.edit(new Discord.RichEmbed(editChannel.embeds[0]));
                                                                            }
                                                                    }, 2000);
                                                                }
                                                            }
                                                        }
                                                    }))
                                                )
                                        } else {
                                            editRole.embeds[0].fields[0].value = setLanguage.cEmbedPban;
                                            editRole.edit(new Discord.RichEmbed(editRole.embeds[0]));
                                        }
                                    }, 2000);
                                }
                            }
                        }
                    }))
                )
        }
    }
};
