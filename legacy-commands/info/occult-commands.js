const { Client, MessageEmbed, Message, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require("node-fetch");
const { embedColor } =  require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");


module.exports = {
    name: "occult-commands",
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
            console.log(`Fetched occultCommands Database from - userId: ${user.id}`);
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
        .setThumbnail('https://i.postimg.cc/RV4ghxnv/oclt.jpg')
        .setTitle('<:mgkbl:957112349439979541> **Occult Commands** <:mgkbl:957112349439979541>')
        .setDescription('These commands are our current Occult commands!')
        .addField('<:tpsh:955321772058763305> **Moon** <:tpsh:955321772058763305>', 'Use ~moon to get the phase of the current day! You will get a description telling you what it represents and what it is a good time for, as well as giving you the date, age, distance, longitude, latitude, phase, trajectory and constellation!')
        .addField('<:tpsh:955321772058763305> **Horoscope** <:tpsh:955321772058763305>', 'Use ~horoscope <sign> <today/tomorrow/yesterday> to get the daily scoop! This command tells you the sign of course, current date, color, lucky number/time, compatibility, description and date range.')
        .addField('<:tpsh:955321772058763305> **Resources** <:tpsh:955321772058763305>', 'Use ~resources to get a huge list of, and, approved by me, blog sites, that give you DIYs, correspondences, timing planning, information on wheel of the year and much much more!')
        return message.channel.send({embeds: [embed], components: [row]});
     }
}
