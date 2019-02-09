const Discord = require("discord.js");
const inGame = new Set();


module.exports = class jeux {
    constructor() {
        this.name = 'classarts',
            this.alias = ['classchiffre'],
            this.usage = '.classarts'
    }
    run(bot, message, args, fr, en, setLanguage) {
        message.delete()
        if (fr.has(message.guild.id) || en.has(message.guild.id)) {
            if (!message.member.roles.find(role => role.name === "pban")) {
                if (!inGame.has(message.author.id)) {
                    inGame.add(message.author.id);
                    if (!args[1]) {
                        var author = message.author.username;
                        var everId = message.guild.roles.find(role => role.name === `@everyone`).id;
                        message.member.guild.createRole({
                            name: `${author} ${args[0]}`
                        });
                        setTimeout(function () {
                            var role = message.guild.roles.find(role => role.name === `${author} ${args[0]}`)
                            setTimeout(function () {
                                var roleid = role.id
                                message.member.addRole(role)
                                const themind = new Discord.RichEmbed()
                                    .setTitle(`${author} ${args[0]}`)
                                    .setColor("#ffffff")
                                    .setFooter("GameBot by Laizo", bot.user.avatarURL)
                                    .addField(setLanguage.gEmbedParty,
                                        setLanguage.gEmbedReact)
                                    .addField(setLanguage.gEmbedGame,
                                        setLanguage.gEmbedHelp)
                                message.channel.send(themind)
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
                                    id: everId,
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: roleid,
                                    allow: ['VIEW_CHANNEL'],
                                }]);
                            }, 1000);
                        }, 1000);
                        return console.log(`${author} ${args[0]} created`);
                    } else {
                        const themindhelp = new Discord.RichEmbed()
                            .setTitle(`Règles de the mind`)
                            .setColor("#008000")
                            .setFooter("GameBot by Laizo", bot.user.avatarURL)
                            .addField("Déroulement de la partie",
                                "Au début, des numeros vous seront envoyé en mp. Votre but sera de remettre les numéros que vous et vos coéquipiés avez reçu dans l'odre coissant sans que vous puissiez dire votre/vos numéro(s) aux autres")
                            .addField("Les niveaux",
                                "Le jeu est réparti en plusieurs niveaux: au premier niveaux chaqun recevra un numéro, au second cous recevrez deux numéros, ... Plus vous irez loin, meilleure sera votre récompense !")
                        message.delete()
                        message.channel.send(themindhelp)
                    }
                } else {
                    message.author.send("Vous êtes déjà en partie")
                }
            } else {
                message.author.send("Vous ne pouvez pas créer de partie car vous avez été banni sur ce serveur")
            }
        } else {
            message.channel.send("The server is not configured, perform : .config")
        }
    }
};