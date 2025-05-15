const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");


module.exports = {
    name: "disablemuterole",
    aliases: ['clearmuterole', 'dmr', 'disablemr', 'dmrole'],
    description: 'Disables Server Mute Role',
    usage: '[role name | role mention | role ID]',
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
            let a = await db.fetch(`muterole-${message.guild.id}`)

            if (!a) {
                return message.channel.send({content: "**There Is No Muterole Set To Disable!**"})
            } else {
                let role = message.guild.roles.cache.get(a)
                await db.pull(`muterole-${message.guild.id}`)

                message.channel.send({content: `**\`${role.name}\` Has Been Successfully Disabled**`})
            }
            return;
        } catch {
            return message.channel.send({content: "**Error - `Missing Permissions or Role Doesn't Exist`**"})
        }
    }
}