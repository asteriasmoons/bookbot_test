const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "disablemodlogchannel",
    aliases: ['dmc', 'disablem', 'disablemodlog'],
    category: 'moderation',
    description: 'Disables Server Modlog Channel',
    usage: '[channel name | channel mention | channel ID]',
    accessableby: 'Administrators',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        db.on("ready", () => {
            console.log(`Fetched ban Database from - ServerId: ${message.guild.id}`);
          });
        
          // top-level awaits
          await db.connect(); 

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({content: "**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"})

        try {
            let a = await db.fetch(`modlog-${message.guild.id}`)

            if (!a) {
                return message.channel.send({content: '**There Is No Modlog Channel Set To Disable!**'})
            } else {
                let channel = message.guild.channels.cache.get(a)
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send({content: "**Welcome Channel Disabled!**"})
                await db.pull(`modlog-${message.guild.id}`)

                message.channel.send({content: `**Modlog Channel Has Been Successfully Disabled in \`${channel.name}\`**`})
            }
            return;
        } catch {
            return message.channel.send({content: "**Error - `Missing Permissions or Channel Doesn't Exist`**"})
        }
    }
}