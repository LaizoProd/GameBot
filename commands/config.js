const Discord = require("discord.js");

module.exports = class config {
    constructor() {
        this.name = 'configuration',
            this.alias = ['config'],
            this.usage = '.configuration'
    }
    run(bot, message, args, setLanguage, db) {
        message.delete()
        if (message.member.hasPermission("ADMINISTRATOR")) {
            var embedRole = 1;
            var embedChannel = 1;
            var editRole;
            var editChannel;
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
                                    db.set(message.guild.id)
                                        .write()
                                    let setLanguage;
                                    if (reaction.emoji.name === "🇨🇵") {
                                        db.set(message.guild.id , 'fr')
                                            .write();
                                        setLanguage = require("../language/fr.json");
                                    } else {
                                        db.set(message.guild.id, 'en')
                                            .write();
                                        setLanguage = require("../language/en.json");
                                    }
                                    reaction.message.embeds[0].fields[0].value = setLanguage.cLanguage;
                                    reaction.message.edit(new Discord.RichEmbed(reaction.message.embeds[0]));
                                    if (embedRole == 1) {
                                        embedRole += 1;
                                        const pbanembed = new Discord.RichEmbed()
                                            .setTitle("Configuration")
                                            .setColor("#ff0000")
                                            .setFooter("GameBot by Laizo", bot.user.avatarURL)
                                            .addField("Ban",
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
                                                                    if (!message.member.guild.roles.find(role => role.name === "pban")) {
                                                                        message.member.guild.createRole({
                                                                            name: `pban`
                                                                        })
                                                                    }
                                                                } else if (message.member.guild.roles.find(role => role.name === "pban")) {
                                                                    message.member.guild.roles.find(role => role.name === "pban").delete();
                                                                }
                                                                if (embedChannel == 1) {
                                                                    embedChannel += 1;
                                                                    const channel = new Discord.RichEmbed()
                                                                        .setTitle("Configuration")
                                                                        .setColor("#ff0000")
                                                                        .setFooter("GameBot by Laizo", bot.user.avatarURL)
                                                                        .addField("Invitation",
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
                                                                                                if (!message.member.guild.channels.find(channel => channel.name === "invitation")) {
                                                                                                    message.guild.createChannel("invitation", "text", [{
                                                                                                        id: message.member.guild.roles.find(role => role.name === `@everyone`).id,
                                                                                                        deny: ['SEND_MESSAGES']
                                                                                                    }]);
                                                                                                }
                                                                                            } else if (message.member.guild.channels.find(channel => channel.name === "invitation")) {
                                                                                                message.member.guild.channels.find(channel => channel.name === "invitation").delete();
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }))
                                                                        )
                                                                }
                                                            }
                                                        }
                                                    }
                                                }))
                                            )
                                    } else {
                                        editRole.embeds[0].fields[0].value = setLanguage.cEmbedPban;
                                        editRole.edit(new Discord.RichEmbed(editRole.embeds[0]));
                                        if (embedChannel == 2) {
                                            editChannel.embeds[0].fields[0].value = setLanguage.cEmbedChannel;
                                            editChannel.edit(new Discord.RichEmbed(editChannel.embeds[0]));
                                        }
                                    }
                                }
                            }
                        }
                    }))
                )
        }
    }
};
