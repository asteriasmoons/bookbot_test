const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");

module.exports = {
    name: "scshop",
    aliases: ['scs'], //aliases are optional
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 
    const embed = new MessageEmbed()
    .setTitle("<:scct:954827658762522654>**Starcandy Shop**<:scct:954827658762522654>")
    .setThumbnail('https://i.postimg.cc/tC1ysKzJ/scshop.jpg')
    .setDescription("Use ~buy <item name> to buy an item! These items are additional items you can buy for your pet dragon using Starcandy!")
    .setColor('#0A0301')
    .setFooter("Tip! Starcandy shop items increases your pets satisfaction!","https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg")
    .addFields(
      { name: '<:scray:953047452699725824>**Coloring Book!**<:scray:953047452699725824>', value: 
  '**3**<:scct:954827658762522654>', inline: false },
      { name: '<:wizw:909111713511645214>**Dragon Wand!**<:wizw:909111713511645214>', value:
  '**6**<:cryp:956382071050342400>', inline: false },
      { name: '<:baid:924880537590583327>**Pet Health!**<:baid:924880537590583327>', value:
  '**6**<:scct:954827658762522654>', inline: false },
      { name: '<:tpu:930630862951817226>**Pet Satisfaction!**<:tpu:930630862951817226>', value:
  '**9**<:cryp:956382071050342400>', inline: false },
      { name: '<:honiee:952310825937420308>**Jar Of Honey!**<:honiee:952310825937420308>', value: 
  '**6**<:scct:954827658762522654>', inline: false },
      { name: '<a:sbmoon:925840425498054728>**Chocolate Strawberries!**<a:sbmoon:925840425498054728>', value: 
  '**9**<:scct:954827658762522654>', inline: false },
      { name: '<a:moonberry:924195825498882089>**Vanilla Strawberries!**<a:moonberry:924195825498882089>', value: 
  '**9**<:scct:954827658762522654>', inline: false },
    )

  message.channel.send({ embeds: [embed] });
  }
}
