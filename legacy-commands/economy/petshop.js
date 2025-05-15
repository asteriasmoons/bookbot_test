const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");

module.exports = {
    name: "petshop",
    aliases: ['ps'], //aliases are optional
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 
    const embed = new MessageEmbed()
    .setTitle("<:nix:959126006990508072>**Pet Shop**<:nix:959126006990508072>")
    .setDescription("**Use ~buy <pet name> to buy a pet!**")
    .setThumbnail('https://i.postimg.cc/KzFvNyZB/IMG-1475.jpg')
    .setColor('#0A0301')
    .setFooter("Tip! Pets will eventually have their own commands so you can play with them and feed them!","https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg")
    .addFields(
      { name: '<:mina:959521827175157840>**Mina**<:mina:959521827175157840>', value: 
  '**35**<:vtbot:947767487594909716>', inline: false },
      { name: '*Mina likes to be snuggled when its raining! She also loves long walks!*', value: 
  '35', inline: false },
      { name: '<:clover:959521775220305940>**Clover**<:clover:959521775220305940>', value: 
  '**30**<:vtbot:947767487594909716>', inline: false },
      { name: '*Clover likes to pick four leaf clovers and put them in his scrapbook!*', value: 
  '30', inline: false },
      { name: '<:strawbi:959521754588528660>**Strawbi**<:strawbi:959521754588528660>', value: 
  '**25**<:vtbot:947767487594909716>', inline: false },
      { name: '*Strawbi likes chocolate and vanilla covered strawberries and warm hugs!*', value: 
  '25', inline: false },
      { name: '<:meka:959521793134190632>**Mika**<:meka:959521793134190632>', value: 
  '**20**<:vtbot:947767487594909716>', inline: false },
      { name: '*Mika loves a good story at bedtime and sleeps with a night light on!*', value: 
  '20', inline: false},
      { name: '<:rory:959521811274563634>**Rory**<:rory:959521811274563634>', value: 
  '**15**<:vtbot:947767487594909716>', inline: false },
      { name: '*Rory loves chasing fireflies and gets sleepy often, so he needs two naps a day!*', value: 
  '15', inline: false },
    )

  message.channel.send({ embeds: [embed] });
  }
}
