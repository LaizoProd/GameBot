const Discord = require("discord.js");
const inGame = new Set();


module.exports = class jeux {
    constructor() {
        this.name = 'classletter',
            this.alias = ['classlettre'],
            this.usage = '.classletter'
    }
    run(bot, message, args, fr, en, setLanguage) {
        message.delete()
        if (fr.has(message.guild.id) || en.has(message.guild.id)) {
            if (!message.member.roles.find(role => role.name === "pban")) {
                if (!args[1]) {
                    if (!inGame.has(message.author.id)) {
                        inGame.add(message.author.id);
                        var author = message.author.username;
                        message.member.guild.createRole({
                            name: `${author} ${args[0]}`
                        });
                        setTimeout(function () {
                            var role = message.guild.roles.find(role => role.name === `${author} ${args[0]}`)
                            setTimeout(function () {
                                message.member.addRole(role)
                                const game = new Discord.RichEmbed()
                                    .setTitle(`${author} ${args[0]}`)
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
                                                if (!inGame.has(message.author.id)) {
                                                    var member = reaction.message.guild.members.get(user.id)
                                                    inGame.add(member.id);
                                                    reaction.message.guild.members.get(user.id).addRole(role);
                                                    console.log(`${member} join ${author} ${args[0]}`)
                                                } else {
                                                    reaction.message.guild.members.get(user.id).send(setLanguage.alreadyPlay)
                                                }
                                            }
                                        })
                                    });
                                message.guild.createChannel(`${author} ${args[0]}`, "text", [{
                                    id: message.guild.roles.find(role => role.name === `@everyone`).id,
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: role.id,
                                    allow: ['VIEW_CHANNEL'],
                                }]);
                            }, 2000);
                        }, 1000);
                        return console.log(`${author} ${args[0]} created`);
                    } else {
                        message.author.send(setLanguage.alreadyPlay)
                    }
                } else {
                    if (args[0] = ".classletter" || ".classlettre") {
                        const themindhelp = new Discord.RichEmbed()
                            .setTitle(setLanguage.rClassartTitle)
                            .setColor("#008000")
                            .setFooter("GameBot by Laizo", bot.user.avatarURL)
                            .addField(setLanguage.rClassartTitleParty,
                                setLanguage.rClassartParty)
                        message.delete()
                        message.channel.send(themindhelp)
                    }
                }
            } else {
                message.author.send(setLanguage.Banned)
            }
        } else {
            message.channel.send("The server is not configured, perform : .config")
        }
    }
};