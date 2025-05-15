const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "purge",
    aliases: [],
    category: "moderation",
    description: "Deletes messages from a channel",
    usage: "m/purge [amount of messages]",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({content: "You Don't Have Sufficient Permissions!- [MANAGE_MESSAGES]"})
        if (isNaN(args[0]))
            return message.channel.send({content: '**Please Supply A Valid Amount To Delete Messages!**'});

        if (args[0] > 100)
            return message.channel.send({content: "**Please Supply A Number Less Than 100!**"});

        if (args[0] < 1)
            return message.channel.send({content: "**Please Supply A Number More Than 1!**"});

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send({content: `**Succesfully deleted \`${messages.size}/${args[0]}\` messages**`}).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
    }
}