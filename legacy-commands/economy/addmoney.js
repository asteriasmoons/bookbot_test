const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ms = require("parse-ms");
const { embedColor } = require('../../config.js');

module.exports = {
    name: "addmoney",
    aliases: ["am"],
    description: "Adds affirmations to a user",
    usage: `[ mention | ID]`,   
    accessableby: "Administrator, Owner",
        /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async ( client, message, args ) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({content: "❌ You Do Not Have Permissions To Add affirmations! - [ADMINISTRATOR]"});
        if (!args[0]) return message.channel.send({content: "**Please Enter A User!**"})

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send({content: "**Enter A Valid User!**"})
        if (!args[1]) return message.channel.send({content: "**Please Enter A Amount!**"})
        if (isNaN(args[1])) return message.channel.send({content: `**❌ Your Amount Is Not A Number!**`});
        if (args[0] > 10000) return message.channel.send({content: "**Cannot Add That Much Amount!**"})
        db.add(`affirmations_${user.id}`, args[1])
        let bal = db.fetch(`affirmations_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setDescription(`✅ Added ${args[1]} affirmations\n\nNew Balance: ${bal}`);
        message.channel.send({embeds: [moneyEmbed]})

    }
}