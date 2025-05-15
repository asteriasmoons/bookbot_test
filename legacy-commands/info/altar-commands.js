const { Client, MessageEmbed, Message, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require("node-fetch");
const { embedColor } =  require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");


module.exports = {
    name: "altar-commands",
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
            console.log(`Fetched altarCommands Database from - userId: ${user.id}`);
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
        .setThumbnail('https://i.postimg.cc/76vW0ZLW/acmdtn.jpg')
        .setTitle('<:nixm:959126078222372914> **Altar Commands** <:nixm:959126078222372914>')
        .setDescription('We now have a seperate category for the altar and the commands it has, here they are currently!')
        .addField('<:tpsh:955321772058763305> **Altar** <:tpsh:955321772058763305>', 'Use ~altar to check your mundane and magical balance! Once you have a pet it will show here too!')
        .addField('<:tpsh:955321772058763305> **Bio Set** <:tpsh:955321772058763305>', 'Use ~bio-set to make a biography for your altar. If youre a premium user you will have the option to add your divider to your bio!')
        .addField('<:tpsh:955321772058763305> **Bio Check** <:tpsh:955321772058763305>', 'Use ~bio-check when you ONLY want to see your biography.')
        .addField('<:tpsh:955321772058763305> **Bio-Reset** <:tpsh:955321772058763305>', 'Use ~bio-reset/delete to clear your biographhy! You can set a new one with ~bio-set.')
        return message.channel.send({embeds: [embed], components: [row]});
     }
}
