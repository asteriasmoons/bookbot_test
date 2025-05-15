const { Client, MessageEmbed, Message, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require("node-fetch");
const { embedColor } =  require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");


module.exports = {
    name: "economy-commands",
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
            console.log(`Fetched economyCommands Database from - userId: ${user.id}`);
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
          .setThumbnail('https://i.postimg.cc/7ZHYHmDf/msoda.jpg')
          .setTitle('<:msoda:955233907719143444> **Economy Commands!** <:msoda:955233907719143444>')
          .setDescription('These are all the economy commands we have currently')
          .addField('<:ipsh:955321757202518057> **Manifest** <:ipsh:955321757202518057>', 'Use ~manifest to earn Moonsoda! You do some witchy stuff random and earn Moonsoda. Use your Moonsoda in our Moonshop!')
          .addField('<:ipsh:955321757202518057> **Wish** <:ipsh:955321757202518057>', 'Use ~wish to earn Starcandy! You can use your Starcandy to buy items in the Starcandy shop!')
          .addField('<:ipsh:955321757202518057> **Wand** <:ipsh:955321757202518057>', 'Use ~wand to cast a circle and earn Protection Points!')
          .addField('<:ipsh:955321757202518057> **Affirm** <:ipsh:955321757202518057>', 'Use ~affirm to get a random affirmation and affirmation points. Check your points using ~altar!')
          .addField('<:ipsh:955321757202518057> **Cauldron** <:ipsh:955321757202518057>', 'Use ~cauldron to either successfully or possibly poorly make a simmer pot and earn Crescent Juice!')
          .addField('<:ipsh:955321757202518057> **Play** <:ipsh:955321757202518057>', 'Currently we are working on a new set of Pet Dragons but you can still use this command if you get a pet before then by typing ~play!')
          .addField('<:ipsh:955321757202518057> **Moonshop** <:ipsh:955321757202518057>', 'Use ~moonshop or ~ms to see all the items we have in the Moonshop. Items in the Moonshop can only be bought with Moonsoda!')
          .addField('<:ipsh:955321757202518057> **Starcandy Shop** <:ipsh:955321757202518057>', 'Use ~starcandyshop to see all of the items you can buy using your Starcandy!')
          .addField('<:ipsh:955321757202518057> **Pet Shop** <:ipsh:955321757202518057>', 'Use ~petshop or ~ps to see all of our Pet Dragons! Use your Magic Tickets to buy a pet!')
          .addField('<:ipsh:955321757202518057> **Buy** <:ipsh:955321757202518057>', 'Use ~buy <item name> to buy any of our shops items!')
          return message.channel.send({embeds: [embed], components: [row]});
     }
}
