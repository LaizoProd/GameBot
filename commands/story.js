const Discord = require("discord.js");

module.exports = class story {
    constructor() {
        this.name = 'story',
            this.alias = ['histoire'],
            this.usage = '.story'
    }
    run(bot, message, args, setLanguage, db) {
        message.delete()
        let setLanguage;
        if (args[0] === ".story") {
            setLanguage = require("../language/en.json");
        } else if (args[0] === ".histoire") {
            setLanguage = require("../language/fr.json");
        }
        const pbanembed = new Discord.RichEmbed()
            .setTitle(setLanguage.sTitle)
            .setColor("#ff0000")
            .setFooter("GameBot by Laizo", bot.user.avatarURL)
            .addField(setLanguage.sChooseTitle,
                setLanguage.sChoose)
        message.author.send(pbanembed)
            .then(embedMessage => embedMessage.react("💀").then(() => embedMessage.react("❎"))
                .then(bot.on("messageReactionAdd", function (reaction, user) {
                    if (embedMessage.id === reaction.message.id) {
                        if (user.id == "540103334309265408") {
                        } else {
                            if (reaction.emoji.name === "💀") {
                                message.author.send("ça commence...")
                            } else {
                            }
                        }
                    }
                }))
            )
    }
};
