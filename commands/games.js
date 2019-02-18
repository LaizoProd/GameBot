const Discord = require("discord.js");
const inGame = new Set();

module.exports = class games {
    constructor() {
        this.name = 'games',
            this.alias = ['jeux', 'classlettre', 'classletter'],
            this.usage = '.game'
    }
    run(bot, message, args, fr, en, setLanguage) {
        message.delete()
        if (fr.has(message.guild.id) || en.has(message.guild.id)) {
            if (args[0] === ".games" || ".jeux" || ";games" || ";jeux") {
                const game = new Discord.RichEmbed()
                    .setTitle(setLanguage.gTitle)
                    .setColor("#008000")
                    .setFooter("GameBot by Laizo", bot.user.avatarURL)
                    .addField(setLanguage.gMultiTitle,
                        setLanguage.gMulti)
                    .addField(setLanguage.gSoloTitle,
                        setLanguage.gSolo)
                message.channel.send(game)
            } else {
                if (!message.member.roles.find(role => role.name === "pban")) {
                    if (!args[1]) {
                        if (!inGame.has(message.author.id)) {
                            message.member.guild.createRole({
                                name: `${message.author.username} ${args[0]}`
                            });
                            setTimeout(function () {
                                const game = new Discord.RichEmbed()
                                    .setTitle(`${message.author.username} ${args[0]}`)
                                    .setColor("#ffffff")
                                    .setFooter("GameBot by Laizo", bot.user.avatarURL)
                                    .addField(setLanguage.gEmbedParty,
                                        setLanguage.gEmbedReact)
                                    .addField(setLanguage.gEmbedGame,
                                        setLanguage.gEmbedHelp)
                                message.channel.send(game)
                                    .then(embedMessage => {
                                        embedMessage.react("✅");
                                        bot.on("messageReactionAdd", function (reaction, user) {
                                            if (embedMessage.id === reaction.message.id) {
                                                var member = reaction.message.guild.members.get(user.id)
                                                if (!inGame.has(member.id)) {
                                                    inGame.add(member.id);
                                                    member.addRole(message.guild.roles.find(role => role.name === `${message.author.username} ${args[0]}`));
                                                    console.log(`${member} join ${message.author.username} ${args[0]}`)
                                                } else {
                                                    if (user.id !== bot.user.id)
                                                        member.send(setLanguage.alreadyPlay)
                                                }
                                            }
                                        })
                                    });
                                message.guild.createChannel(`${message.author.username} ${args[0]}`, "text", [{
                                    id: message.guild.roles.find(role => role.name === `@everyone`).id,
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: message.guild.roles.find(role => role.name === `${message.author.username} ${args[0]}`).id,
                                    allow: ['VIEW_CHANNEL'],
                                }]);
                            }, 1000);
                            return console.log(`${message.author.username} ${args[0]} created`);
                        } else {
                            message.author.send(setLanguage.gAlreadyPlay)
                        }
                    } else {
                        if (args[0] === ".classletter" || ".classlettre" || ";classletter" || ";classlettre") {
                            const themindhelp = new Discord.RichEmbed()
                                .setTitle(setLanguage.rClassletterTitle)
                                .setColor("#008000")
                                .setFooter("GameBot by Laizo", bot.user.avatarURL)
                                .addField(setLanguage.rClassletterTitleParty,
                                    setLanguage.rClassletterParty)
                            message.channel.send(themindhelp)
                        }
                    }
                } else {
                    message.author.send(setLanguage.gBanned)
                }
            }
        } else {
            message.channel.send("The server is not configured, an administrator must perform : .config")
        }

    }
};
