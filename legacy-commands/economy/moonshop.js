const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { embedColor } = require("../../config.js");

module.exports = {
    name: "moonshop",
    aliases: ['ms'], //aliases are optional
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

    const embed = new MessageEmbed()
    .setTitle("<:wmbot:949247456254779392>**Moon Shop**<:wmbot:949247456254779392>")
    .setDescription("**Use ~buy <item name> to buy an item!**")
    .setThumbnail('https://i.postimg.cc/0j0SffR2/IMG-1472.jpg')
    .setColor(embedColor)
    .setFooter("Tip! Moon shop items will all eventually have their own commands!", "https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg")
    .addFields(
      { name: '<:alnt:953467518016700446>**Tarot**<:alnt:953467518016700446>', value: '600<:msoda:955233907719143444>', inline: false },
      { name: '<:pend:933046351657312348>**Pendulum**<:pend:933046351657312348>', value: '550<:msoda:955233907719143444>', inline: false },
      { name: '<:dvntn:957112387083849758>**Grimoire**<:dvntn:957112387083849758>', value: '500<:msoda:955233907719143444>', inline: false },
      { name: '<:wbot:949247534394654730>**Wand**<:wbot:949247534394654730>', value: '450<:msoda:955233907719143444>', inline: false },
      { name: '<:cstjc:959518995692781638>**Crescent Juice**<:cstjc:959518995692781638>', value: '400<:msoda:955233907719143444>', inline: false },
      { name: '<:rbt:954966999199531028>**Potion**<:rbt:954966999199531028>', value: '350<:msoda:955233907719143444>', inline: false },
      { name: '<:pyf:910658359034781706>**Besom**<:pyf:910658359034781706>', value: '300<:msoda:955233907719143444>', inline: false },
      { name: '<:mgkbl:957112349439979541>**Crystal Ball**<:mgkbl:957112349439979541>', value: '250<:msoda:955233907719143444>', inline: false },
      { name: '<:crsp:957534726627922041>**Crystals**<:crsp:957534726627922041>', value: '200<:msoda:955233907719143444>', inline: false },
      { name: '<:cgcd:957877549814382592>**Cauldron**<:cgcd:957877549814382592>', value: '150<:msoda:955233907719143444>', inline: false },
      { name: '<:mcpbot:912818646148075540>**Mooncakes**<:mcpbot:912818646148075540>', value: '100<:msoda:955233907719143444>', inline: false },
      { name: '<:fpbot:932772538923229244>**Starcakes**<:fpbot:932772538923229244>', value: '50<:msoda:955233907719143444>', inline: false },

    )

    message.channel.send({ embeds: [embed] });
  }
}
