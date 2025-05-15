const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");

// module.exports is the command handler, the base of a command structure
module.exports = {
    name: "flower",
    aliases: ['f'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { //run makes the command well run lol
      
      let user = message.author
      
      let Flowerjson = require('../../scripts/flower/flower.json')
      
      let AllFlowers = [Flowerjson.flowers.eyebright, Flowerjson.flowers.pinkbabysbreath, Flowerjson.flowers.honeysuckle, Flowerjson.flowers.lilac, Flowerjson.flowers.daffodil, Flowerjson.flowers.waterlily]
      let FlowerOutcome = AllFlowers[Math.floor(Math.random() * AllFlowers.length)]
      
          const embed = new MessageEmbed()
          .setTitle(`<:dvntn:957112387083849758> Flowers | ${FlowerOutcome.name} <:dvntn:957112387083849758>`)
          .addField(`<:tpsh:955321772058763305> Usage <:tpsh:955321772058763305>`, `${FlowerOutcome.usage}`)
          .addField(`<:rpsh:955321723434205225> Magic <:rpsh:955321723434205225>`, `${FlowerOutcome.magic}`)
          .addField(`<:upsh:955695038191501332> Benefits <:upsh:955695038191501332>`, `${FlowerOutcome.benefits}`)
          .addField(`<:gpsh:956246336318095370> Myths <:gpsh:956246336318095370>`, `${FlowerOutcome.myths}`)
          .addField(`<:ipsh:955321757202518057> Botanical Name <:ipsh:955321757202518057>`, `${FlowerOutcome.botanical_name}`)
          .addField(`<:ipsh:955321757202518057> Folk Names <:ipsh:955321757202518057>`, `${FlowerOutcome.folk_names}`)
          .addField(`<:gpsh:956246336318095370> Element <:gpsh:956246336318095370>`, `${FlowerOutcome.element}`)
          .addField(`<:tpsh:955321772058763305> Planet <:tpsh:955321772058763305>`, `${FlowerOutcome.planet}`)
          .addField(`<:rpsh:955321723434205225> Powers <:rpsh:955321723434205225>`, `${FlowerOutcome.powers}`)
          .setColor('0A0301')
          .setThumbnail('https://i.postimg.cc/0j5Jb3Fh/Screenshot-64.png')
          .setFooter('Note: I am adding more flowers daily!', 'https://i.postimg.cc/6pkS9JP1/nl.jpg')
      message.channel.send({embeds: [embed]});
   }
}
      
      
