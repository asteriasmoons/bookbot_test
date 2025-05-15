const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");

// module.exports is the command handler, the base of a command structure
module.exports = {
    name: "crystal",
    aliases: ['c'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { //run makes the command well run lol
      
      let user = message.author
      
      let Crystalsjson = require('../../scripts/crystals/crystals.json')
      
      let AllCrystals = [Crystalsjson.crystals.agate, Crystalsjson.crystals.mossagate, Crystalsjson.crystals.treeagate, Crystalsjson.crystals.amber, Crystalsjson.crystals.amethyst, Crystalsjson.crystals.aventurine, Crystalsjson.crystals.bloodstone, Crystalsjson.crystals.calcite, Crystalsjson.crystals.carnelian, Crystalsjson.crystals.citrinepoints, Crystalsjson.crystals.clearcitrine, Crystalsjson.crystals.fluorite, Crystalsjson.crystals.hematite, Crystalsjson.crystals.jade, Crystalsjson.crystals.jasper, Crystalsjson.crystals.lapislazuli, Crystalsjson.crystals.malachite, Crystalsjson.crystals.moonstone, Crystalsjson.crystals.onyx, Crystalsjson.crystals.blackorwhiteonyx, Crystalsjson.crystals.quartzcrystal, Crystalsjson.crystals.rosequartz, Crystalsjson.crystals.smokyquartz, Crystalsjson.crystals.rutilatedquartz, Crystalsjson.crystals.tourmalinatedquartz, Crystalsjson.crystals.rhodonite, Crystalsjson.crystals.serpentine, Crystalsjson.crystals.tigerseye, Crystalsjson.crystals.turquoise]
      let CrystalsOutcome = AllCrystals[Math.floor(Math.random() * AllCrystals.length)]
      
          const embed = new MessageEmbed()
          .setTitle(`<:ntrmk:958381228703244308> Crystals | ${CrystalsOutcome.name} <:ntrmk:958381228703244308>`)
          .addField(`<:picrys:933599973487030282> Description <:picrys:933599973487030282>`, `${CrystalsOutcome.description}`)
          .setColor('0A0301')
          .setThumbnail('https://i.postimg.cc/vmyvYF8L/crys.jpg')
          .setFooter('Tip! If you want to see specific Crystals, you can send it into suggestions!', 'https://i.postimg.cc/6pkS9JP1/nl.jpg')
      message.channel.send({embeds: [embed]});
   }
}
      
      
