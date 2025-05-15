const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "petbuy", 
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

    let user = message.author;

    let author = db.fetch(`mina_${user.id}`)


    if(!args[0]){

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setTitle('View \`~pet shop\` first and buy here!')
      .setDescription('You can buy any pet from the pet shop with `~pet buy <item>`!')
      .setFooter('https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg')
      message.channel.send({ embeds: [embed] });

    } else if (args[0] === 'mina'){

      if (author < 35) return message.channel.send({content: `You dont have sufficient tickets! Mina cost \`35\` magic tickets`});

      const embed = new MessageEmbed()
        .setColor('0A0301')
        .setTitle('<:mina:959521827175157840>**Mina!**<:mina:959521827175157840>')
        .setDescription('You just bought Mina <:mina:959521827175157840> for 35 <:vtbot:947767487594909716>! Dont forget Mina likes to cuddle when its raining and she loves starcakes!')
        .setFooter('https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg')
      db.subtract(`tickets_${user.id}`, 35);
      message.channel.send({ embeds: [embed] }).then(db.add(`mina_${user.id}`, 1));

    } else if(args[0] === 'clover'){

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setTitle('<:clover:959521775220305940>**Clover!**<:clover:959521775220305940>')
      .setDescription('You just bought Clover <:clover:959521775220305940> for 30 <:vtbot:947767487594909716>!')
      .setFooter('https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg')
      db.subtract(`tickets_${user.id}`, 30);
      message.channel.send({ embeds: [embed] }).then(db.add(`clover_${user.id}`, 1));

    } else if(args[0] === 'strawbi'){

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setTitle('<:strawbi:959521754588528660>**Strawbi!**<:strawbi:959521754588528660>')
      .setDescription('You just bought a Strawbi <:strawbi:959521754588528660> for 25 <:vtbot:947767487594909716>!')
      .setFooter('https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg')
      db.subtract(`tickets_${user.id}`, 25);
      message.channel.send({ embeds: [embed] }).then(db.add(`strawbi_${user.id}`, 1));

    } else if(args[0] === 'mika'){

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setTitle('<:meka:959521793134190632>**Mika!**<:meka:959521793134190632>')
      .setDescription('You just bought Mika <:meka:959521793134190632> for 20 <:vtbot:947767487594909716>')
      .setFooter('https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg')
      db.subtract(`tickets_${user.id}`, 20);
      message.channel.send({ embeds: [embed] }).then(db.add(`mika_${user.id}`, 1));

    } else if(args[0] === 'rory'){

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setTitle('<:rory:959521811274563634>**Rory!**<:rory:959521811274563634>')
      .setDescription('You just bought Rory <:rory:959521811274563634> for 15 <:vtbot:947767487594909716>!')
      .setFooter('https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg')
      db.subtract(`tickets_${user.id}`, 15);
      message.channel.send({ embeds: [embed] }).then(db.add(`rory_${user.id}`, 1));
    } 
  }
}
