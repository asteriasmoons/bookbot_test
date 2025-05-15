const { MessageEmbed, Client, Message } = require('discord.js');
const { embedColor } = require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");
const { response } = require('express');

module.exports = {
  name: "altardb",
  aliases: ["adb"],
  /**
  *
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */
run: async (client, message, args) => {

  const user =
  message.mentions.members.first() ||
  message.guild.members.cache.get(args[0]) ||
  message.guild.members.cache.find(
    r =>
      r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
  ) ||
  message.guild.members.cache.find(
    r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
  ) ||
  message.member;

    db.on("ready", () => {
      console.log(`Fetched Altar Database from - userId: ${user.id}`);
    });

    // top-level awaits
    await db.connect(); 


      let satisfaction = await db.get(`satisfaction-${user.id}`);
        
      if (satisfaction === null) satisfaction = 0;
      
      let affirmations = await db.get(`affirmations-${user.id}`);

      if (affirmations === null) affirmations = 0;
      
      let moonJuice = await db.get(`moonJuice-${user.id}`);

      if (moonJuice === null) moonJuice = 0;

      let starCandy = await db.get(`starCandy-${user.id}`);

      if (starCandy === null) starCandy = 0;

      let tickets = await db.get(`tickets-${user.id}`);

      if (tickets === null) tickets = 0;

      let starCakes = await db.get(`starCakes-${user.id}`);

      if (starCakes === null) starCakes = 0;

      let tarot = await db.get(`tarot-${user.id}`);

      if (tarot === null) tarot = 0;

      let pendulum = await db.get(`pendulum-${user.id}`);

      if (pendulum === null) pendulum = 0;

      let grimoire = await db.get(`grimoire-${user.id}`);

      if (grimoire === null) grimoire = 0;

      let wand = await db.get(`wand-${user.id}`);

      if (wand === null) wand = 0;

      let crescentJuice = await db.get(`crescentJuice-${user.id}`);

      if (crescentJuice === null) crescentJuice = 0;

      let potion = await db.get(`potion-${user.id}`);

      if (potion === null) potion = 0;

      let besom = await db.get(`besom-${user.id}`);

      if (besom === null) besom = 0;

      let crystalBall = await db.get(`crystalBall-${user.id}`);

      if (crystalBall === null) crystalBall = 0;

      let crystals = await db.get(`crystals-${user.id}`);

      if (crystals === null) crystals = 0;

      let cauldron = await db.get(`cauldron-${user.id}`);

      if (cauldron === null) cauldron = 0;

      let moonCakes = await db.get(`moonCakes-${user.id}`);

      if (moonCakes === null) moonCakes = 0;

      let bio = await db.get(`biography-${user.id}`);

      if(!bio) bio = "No description set! Use \`~bio-set\` to set a bio!";

    const embed = new MessageEmbed()
    .setThumbnail('https://i.postimg.cc/FzQBBmmD/IMG-1421.jpg')
    .setTitle(`<:galaxp:952320002848092161> **${user.user.username}'s Altar** <:galaxp:952320002848092161>`)
    .setDescription(`**Pet Dragon**\nYou don’t have a pet dragon yet!\nUse ~tickets shop to shop and ~tickets buy <item> to purchase!\n**We have a total of 5 Pet Dragons! Collect Magic Tickets to buy one!**
            

      **Pet Satisfaction**
      <:tsub:949512760302137405> ${satisfaction} | Use ~play to earn pet satisfaction!\n**Use ~starcandyshop to buy special items for your pet with Starcandy!**
            
      > **Mundane Balance**
      > <:ebot:949503649174913024> ${affirmations} | To earn affirmations use ~affirm whenever you need some affirmations!
      > <:jpbot:947651371539234837> ${moonJuice} | To earn moon juice use ~manifest! **Buy ~moonshop items with moon juice!**
      > <:scbot:954813489594138714> ${starCandy} | Use ~wish to earn starcandy! **Check out the ~starcandyshop too!**
      > <:vtbot:947767487594909716> ${tickets} | Vote for us using ~vote for magic tickets! 
      > <:fpbot:932772538923229244> ${starCakes} | Use ~votes shop to get starcakes!
            
      **Magical Balance**
      <a:atarot:923250163311575040> ${tarot} | **Tarot**
      <:pend:933046351657312348> ${pendulum} | **Pendulum**
      <:bgsb:905505218723205191> ${grimoire} | **Grimoire**
      <:wstar:882997923569340477> ${wand} | **Wand**
      <:cjbot:949247649079500880> ${crescentJuice} | **Crescent Juice**
      <:tealp:929752514805530704> ${potion} | **Potion**
      <:pyf:910658359034781706> ${besom} | **Besom**
      <:ball:907305388330876929> ${crystalBall} | **Crystal Ball**
      <:prc:908164851904438363> ${crystals} | **Crystals**
      <:prd:905534882401374239> ${cauldron} | **Cauldron**
      <:mcpbot:912818646148075540> ${moonCakes} | **Mooncakes**`)
    .setColor(embedColor) // Set the color 
    .setFooter(`Database ID: ${user.user.id}`)

    const embed2 = new MessageEmbed()
    .setThumbnail('https://i.postimg.cc/FzQBBmmD/IMG-1421.jpg')
    .setTitle(`<:galaxp:952320002848092161> **${user.user.username}'s Altar Description** <:galaxp:952320002848092161>`)
    .setDescription(`${bio}`)
    .setColor(embedColor) // Set the color 
    .setFooter(`If you want to reset your bio use ~bio-reset | To check only bio use ~bio-check | Database ID: ${user.user.id}`)

    await message.channel.send({embeds: [embed, embed2]});

  }
}
