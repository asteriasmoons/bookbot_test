const { Client, MessageEmbed, Message, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require("node-fetch");
const { embedColor } =  require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");


module.exports = {
    name: "info-commands",
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
            console.log(`Fetched infoCommands Database from - userId: ${user.id}`);
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
        .setThumbnail('https://i.postimg.cc/D0wQnn8Z/occultcmdm.jpg')
        .setTitle('<:hrbk:957747877910818846> **Information Commands** <:hrbk:957747877910818846>')
        .setDescription('These are the information commands we have currently!')
        .addField('<:gpsh:956246336318095370> Vote <:gpsh:956246336318095370>', 'Do you want to support Nixie any small way you can? Then use ~vote to get a link button embed message to topgg where you can vote for Nixie! Voting for Nixie gives you two Magick Tickets each time you vote! Use your Magic Tickets to buy a Pet Dragon from our Pet Shop!')
        .addField('<:gpsh:956246336318095370> Donate <:gpsh:956246336318095370>', 'Want to buy me a coffee for creating and developing Nixie? Haha. Not literally. Use ~donate if you wanna support Nixie even further, unlock premium commands and gain ultra benefits! Details on memberships and one time shop purchases are on Nixies Ko-fi Shop!')
        .addField('<:gpsh:956246336318095370> Invite <:gpsh:956246336318095370>', 'Enjoying Nixie? Want to Invite her to your own server? Use ~invite to get an invite link for adding Nixie to your own server!')
        .addField('<:gpsh:956246336318095370> Help <:gpsh:956246336318095370>', 'To see all of our command categories and those categories sub commands, use ~help to get a menu with information, buttons, and instructions on how to see other categories/commands and their usage!')
        .addField('<:gpsh:956246336318095370> Ping <:gpsh:956246336318095370>', 'Use ~ping to check and see if Nixie bot is up and running! She will respond with pong, to your ping if she is! If not, please check again later as we are always developing/programming new features. After you have checked twice you may want to reach out to support to find out the problem.')
        .addField('<:gpsh:956246336318095370> Channel Information <:gpsh:956246336318095370>', 'Use ~channel to see information on the channel such as channel name/ID/type (text or voice)/number of users in channel/if NSFW and the date it was created!')
        .addField('<:gpsh:956246336318095370> Server Information <:gpsh:956246336318095370>', 'Use ~server to see information on the server.')
        return message.channel.send({embeds: [embed], components: [row]});
     }
}
