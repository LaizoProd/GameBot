module.exports = class themind {
    constructor() {
        this.name = 'partyunban',
            this.alias = ['punban'],
            this.usage = '.partyunban'
    }
    run(bot, message, args, fr, en, setLanguage) {
        message.delete()
        if (message.member.hasPermission("ADMINISTRATOR")) {
            if (fr.has(message.guild.id) || en.has(message.guild.id)) {
                if (!message.guild.roles.find(role => role.name === "pban") == undefined) {
                    let member = message.mentions.members.first();
                    if (member) {
                        var role = message.guild.roles.find(role => role.name === "pban")
                        member.removeRole(role)
                        message.channel.send(`${member} ${setLanguage.bAnnounce}`)
                    } else {
                        message.author.send(setLanguage.bNoPlayer)
                    }
                } else {
                    message.channel.send(".")
                }
            } else {
                message.channel.send("The server is not configured, an administrator must perform : .config")
            }
        }
    }
};