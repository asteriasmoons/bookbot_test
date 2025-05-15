const { Client, MessageEmbed, Message, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require("node-fetch");
const { embedColor } =  require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");


module.exports = {
    name: "utility-commands",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
run: async (client, message, args) => { 
    
        let user = message.author;

        db.on("ready", () => {
            console.log(`Fetched utilityCommands Database from - userId: ${user.id}`);
          });
        
          // top-level awaits
          await db.connect(); 
      
        const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Invite Nixie')
                    .setStyle('LINK')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=946250414196662282&permissions=8&scope=bot')
                     .setEmoji('<:nix:959126006990508072>'),
                )
                   .addComponents(
                     new MessageButton()
                     .setLabel('Nixie Support Server')
                     .setStyle('LINK')
                     .setURL('https://discord.gg/nixiesether')
                      .setEmoji('<:nixm:959126078222372914>'),
                )
                       .addComponents(
                         new MessageButton()
                         .setLabel('Nixies Ko-fi Shop')
                         .setStyle('LINK')
                         .setURL('https://ko-fi.com/S6S7BU1QB')
                          .setEmoji('<:kckb:959317032711634964>'),
                );
  
          const embed = new MessageEmbed()
          .setColor('0A0301')
          .setThumbnail('https://i.postimg.cc/MpmFJDP9/utils.jpg')
          .setTitle('<:strdst:957112227226341386> **Utility** <:strdst:957112227226341386>')
          .setDescription('These commands are currently all of our utility commands')
          .addField('<:upsh:955695038191501332> **Embed** <:upsh:955695038191501332>', 'Use ~embed <title> ++ <description> ++ <thumbnailURL> ++ <imageURL> to create an embeded messaged!')
          .addField('<:upsh:955695038191501332> **Suggestion** <:upsh:955695038191501332>', 'Use ~suggestion <your suggestion here> to send the bot Devs and Owner a suggestion in their suggestion channel.')
          return message.channel.send({embeds: [embed], components: [row]});
        }
   }
