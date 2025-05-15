const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");

// module.exports is the command handler, the base of a command structure
module.exports = {
    name: "wrune",
    aliases: ['wr'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { //run makes the command well run lol
      
      let user = message.author
      
      let Runejson = require('../../scripts/tarot/runes/witchsrune.json')
      
      let AllRunes = [Runejson.runes.sun, Runejson.runes.moon, Runejson.runes.flight, Runejson.runes.rings, Runejson.runes.trinity, Runejson.runes.woman, Runejson.runes.man, Runejson.runes.harvest, Runejson.runes.crossroads, Runejson.runes.waves, Runejson.runes.star, Runejson.runes.scythe, Runejson.runes.eye];
      let RuneOutcome = AllRunes[Math.floor(Math.random() * AllRunes.length)]

      const embed = new MessageEmbed()
      .setTitle(`RUNES | ${RuneOutcome.name}`)
      .addField(`Keywords`, `${RuneOutcome.keywords}`)
      .addField(`Description`, `${RuneOutcome.description}`)
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/tRshzZJW/wrunes.jpg')
      .setFooter("Tip! You can use this as often as you'd like!", "https://i.postimg.cc/6pkS9JP1/nl.jpg")
      message.channel.send({embeds: [embed]});
   }
}
      
      
