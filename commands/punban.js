module.exports = class punban {
    constructor() {
        this.name = 'partyunban',
            this.alias = ['punban'],
            this.usage = '.partyunban'
    }
    run(bot, message, args, setLanguage, db) {
        message.delete()
        if (message.member.hasPermission("ADMINISTRATOR")) {
            if (db.get(message.guild.id).__wrapped__[message.guild.id] === "fr" || db.get(message.guild.id).__wrapped__[message.guild.id] === "en") {
                if (!message.guild.roles.find(role => role.name === "pban") == undefined) {
                    let member = message.mentions.members.first();
                    if (member) {
                        member.removeRole(message.guild.roles.find(role => role.name === "pban"))
                        message.channel.send(`${member} ${setLanguage.bAnnounce}`)
                    } else {
                        message.author.send(setLanguage.bNoPlayer)
                    }
                } else {
                    message.channel.send(setLanguage.bImpossibleBan)
                }
            } else {
                message.channel.send("The server is not configured, an administrator must perform : .config")
            }
        }
    }
};
