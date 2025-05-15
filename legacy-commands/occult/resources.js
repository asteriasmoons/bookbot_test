const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { embedColor } = require("../../config.js");

module.exports = {
    name: "resources",
    aliases: ['rs'], //aliases are optional
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

      const embed = new MessageEmbed()
      .setColor(embedColor)
      .setThumbnail('https://i.postimg.cc/SQYdLmmT/IMG-2331.jpg')
      .setFooter(`Websites not afiliated with Nixie`, 'https://i.postimg.cc/6pkS9JP1/nl.jpg')
      .setTitle('<:dvntn:957112387083849758>**Witchy Resources**<:dvntn:957112387083849758>')
      .setDescription('Here are some resources in case you need something quickly. These blogs are all approved by me and I highly recommend them!')
      .addField(`\u200B`, `<:mgkbl:957112349439979541>[**Lunar Spell**](https://lunarspell.com/)\n<:mgkbl:957112349439979541>[**Witch Of Lupine Hollow**](https://witchoflupinehollow.com/)\n<:mgkbl:957112349439979541>[**Penniless Pagan**](http://www.pennilesspagan.com/?m=1)\n<:mgkbl:957112349439979541>[**Mumbles and Things**](https://www.mumblesandthings.com/)\n<:mgkbl:957112349439979541>[**Tea Witch’s Grimoire**](https://theteawitchblog.com/)\n<:mgkbl:957112349439979541>[**Witchcasket**](https://witchcasket.co.uk/blog/)\n<:mgkbl:957112349439979541>[**Witch Witch Me**](https://witchwithme.com/blog/)\n<:mgkbl:957112349439979541>[**Crescent Chalice**](https://crescentchalice.com/)\n<:mgkbl:957112349439979541>[**Magick & Alchemy**](https://magickandalchemy.com/)\n<:mgkbl:957112349439979541>[**Sage Goddess**](https://www.sagegoddess.com/blog/)`)
      
      const embed2 = new MessageEmbed()
      .setColor(embedColor)
      .setThumbnail('https://i.postimg.cc/SQYdLmmT/IMG-2331.jpg')
      .setFooter(`Websites not afiliated with Nixie`, 'https://i.postimg.cc/6pkS9JP1/nl.jpg')
      .setTitle('<:dvntn:957112387083849758>**Witchy Resources**<:dvntn:957112387083849758>')
      .setDescription('Here are some resources in case you need something quickly. These blogs are all approved by me and I highly recommend them!')
      .addField(`\u200B`, `<:mgkbl:957112349439979541>[**Flying The Hedge**](https://www.flyingthehedge.com/?m=1)\n<:mgkbl:957112349439979541>[**The Pagan Grimoire**](https://www.pagangrimoire.com/)\n<:mgkbl:957112349439979541>[**Moody Moons**](https://www.moodymoons.com/)\n<:mgkbl:957112349439979541>[**Wicca Now**](https://wiccanow.com/)\n<:mgkbl:957112349439979541>[**Forever Conscious**](https://foreverconscious.com/)\n<:mgkbl:957112349439979541>[**Otherworldly Oracle**](https://otherworldlyoracle.com/)\n<:mgkbl:957112349439979541>[**Letters To Lilith**](https://www.letterstolilith.com/blog)\n<:mgkbl:957112349439979541>[**Zenned Out**](https://cassieuhl.com/blog/)\n<:mgkbl:957112349439979541>[**Modern Day Magick**](https://moderndaymagick.com/blog/)\n<:mgkbl:957112349439979541>[**Worts & Cunning Apothecary**](http://www.wortsandcunning.com/blog)\n<:mgkbl:957112349439979541>[**Inked Goddess Creations**](https://www.inkedgoddesscreations.com/blogs/the-inked-grimoire)`)
      
    message.channel.send({embeds: [embed, embed2]});
   }
}
