module.exports = class themind {
    constructor() {
        this.name = 'partyban',
            this.alias = ['pban'],
            this.usage = '.partyban'
    }
    run(bot, message, args, fr, en, setLanguage) {
        message.delete()
        if (fr.has(message.guild.id) || en.has(message.guild.id)) {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let member = message.mentions.members.first();
                if (member) {
                    var role = message.guild.roles.find(role => role.name === "pban")
                    member.addRole(role)
                    message.channel.send(`${member} ${setLanguage.bAnnounce}`)
                } else {
                    message.author.send(setLanguage.bNoPlayer)
                }
            }
        } else {
            message.channel.send("The server is not configured, perform : .config")
        }
    }
};
