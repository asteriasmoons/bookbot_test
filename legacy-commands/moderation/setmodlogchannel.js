const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "setmodlogchannel",
    category: "moderation",
    aliases: ['setm', 'sm', 'smc', 'setmodlog'],
    description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
    usage: "[channel mention | channel ID | channel name]",
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
    if (!args[0]) {
      let b = await db.get(`modlog-${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send({content:
          `**Modlog Channel Set In This Server Is \`${channelName.name}\`!**`
        });
      } else
        return message.channel.send({content:
          "**Please Enter A Channel Name or ID To Set!**"
        });
    }
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'GUILD_TEXT') return message.channel.send({content: "**Please Enter A Valid Text Channel!**"});

        try {
            let a = await db.get(`modlog-${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send({content: "**This Channel is Already Set As Modlog Channel!**"})
            } else {
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send({content: "**Modlog Channel Set!**"})
                await db.set(`modlog-${message.guild.id}`, channel.id)

                message.channel.send({content: `**Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`})
            }
        } catch {
            return message.channel.send({content: "**Error - `Missing Permissions Or Channel Is Not A Text Channel!`**"});
        }
    }
};
