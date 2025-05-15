const { Client, MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");
const { embedColor } = require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "donate",
    aliases: ['dn'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let user = message.author;

        db.on("ready", () => {
            console.log(`Fetched vote Database from - userId: ${user.id}`);
          });
        
          // top-level awaits
          await db.connect(); 
      
        const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Ko-fi Shop')
                    .setStyle('LINK')
                    .setURL('https://ko-fi.com/S6S7BU1QB'),
                );

                const embed = new MessageEmbed()
                .setColor('0A0301')
                .setTitle('<:nxbt:957436773464690748> **Nixie Ko-fi Shop!** <:nxbt:957436773464690748>')
                .setDescription('<:strdst:957112227226341386> **Membership Tiers** - Support Nixie through a recurring monthly membership!\n<:strdst:957112227226341386> [**Nixies Ether Ko-fi Shop**](https://ko-fi.com/nixiesether/shop) - Support Nixie with one time purchases from the Nixie Ko-fi shop!')
                return message.channel.send({embeds: [embed], components: [row]});
             }
        }
