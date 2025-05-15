const { Client, MessageEmbed, Message, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require("node-fetch");
const { embedColor } =  require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");


module.exports = {
    name: "divination-commands",
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
            console.log(`Fetched divinationCommands Database from - userId: ${user.id}`);
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
          .setThumbnail('https://i.postimg.cc/KzFGRfhK/cb-2.jpg')
          .setTitle('<:dvntn:957112387083849758> **Divination Commands!** <:dvntn:957112387083849758>')
          .setDescription('These are all of our current Divination commands!')
          .addField('<:rpsh:955321723434205225> **Oracle** <:rpsh:955321723434205225>', 'Use ~oracle/o <question> to get a random Oracle answer! Only ask how, when, why, and what questions! Its up to you how you interpret the message! You will get a sentence or two for an answer.')
          .addField('<:rpsh:955321723434205225> **Pendulum** <:rpsh:955321723434205225>', 'Use ~pendulum/pd and ask a question to yourself to get a yes, maybe or no answer!')
          .addField('<:rpsh:955321723434205225> **Witches Rune** <:rpsh:955321723434205225>', 'Use ~wrune to get a random rune to a question you may have. Their are in total 13 witches runes!')
          .addField('<:rpsh:955321723434205225> **Tarot** <:rpsh:955321723434205225>', 'Use ~tarot/tarot text/tarot text 3/t/t 3 to get one to three card tarot reading!')
          .addField('<:rpsh:955321723434205225> **Crystal** <:rpsh:955321723434205225>', 'Use ~crystal to get information on a random crystal. I am adding ~crystal find <name> soon! Use our suggestions command to make suggestions about crystals you want to see.')
          .addField('<:rpsh:955321723434205225> **Flower** <:rpsh:955321723434205225>', 'Use ~flower to get information on a random flower. Coming soon is ~flower find <name>! Use our suggestions command to tell us what flowers you would like to see.')
          return message.channel.send({embeds: [embed], components: [row]});
      }
}
