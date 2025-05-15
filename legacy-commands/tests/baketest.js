const {MessageEmbed, MessageAttachment, Message, Client} = require("discord.js") 
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
  name: "baketest",
  aliases: ["bt"],
  /**
  *
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */
  run: async (client, message, args) =>  {

    let user = message.author;


    db.on("ready", () => {
      console.log(`Fetched wish Database from - userId: ${user.id}`);
    });
  
    // top-level awaits
    await db.connect(); 

  let amount = [3, 6, 9]
  let amountOutcome = Math.floor(Math.random() * amount.length) 
  let reaction = ('<:rpck:954892806214791212>')
  let timeout = 180000;//5 mins

  let daily = await db.get(`bakeTime-${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let timeEmbed = new MessageEmbed()
          .setColor("0A0301")
          .setDescription(`❌ You've already baked\n\nBake again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
      message.channel.send({embeds: [timeEmbed]})
  } else {
    const embed = new MessageEmbed();
    embed.setTitle("<:tppc:953062342680252476>..**It's Time To Bake!!**..<:tppc:953062342680252476>")
    embed.setColor("0A0301")
    embed.setThumbnail('https://i.postimg.cc/7LGcsBHV/bake.jpg')
    embed.setFooter("Tip! You can bake again in 15 minutes!","https://i.postimg.cc/139pM3Rd/nixiethumbnail.jpg")
    embed.setDescription("Bake time! Earn some <:galaxp:952320002848092161> by clicking on the Rainbow Pancakes!\n**Use your Galaxy Pop in the ~starcandyshop!!**");
   const Reactmessage = await message.channel.send({embeds: [embed]})
   Reactmessage.react(`<:rpck:954892806214791212>`)

  const filter = (reaction, user) => { return ['<:rpck:954892806214791212>'].includes(reaction.emoji.name)};

  Reactmessage.awaitReactions(filter, { max: 1, time: 60000 })
      .then(collected => {
      const reaction = collected.first();
    
      collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name.has === '<:rpck:954892806214791212>') {
          const embed = new MessageEmbed();
          embed.setColor('0A0301')
          embed.setDescription(`"You baked some Rainbow pancakes +user.tag because you reacted with <:rpck:954892806214791212> and earned ${amountOutcome}!!`)
          message.channel.send({embeds: [embed]})
          db.add(`galaxyPop-${user.id}`, amountOutcome)
          db.set(`bakeTime-${user.id}`, Date.now())
          }
         })
  })
          .catch(collected => {
          console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
          message.reply('you didn\'t react');
      })
    }
  }
}
