const {MessageEmbed, MessageAttachment, Message, Client} = require("discord.js") 
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
  name: "cauldron",
  /**
  *
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */
  run: async (client, message, args) =>  {

    let user = message.author;


    db.on("ready", () => {
      console.log(`Fetched cauldron Database from - userId: ${user.id}`);
    });
  
    // top-level awaits
    await db.connect(); 

  let amount = [2, 4, 6]
  let amountOutcome = Math.floor(Math.random() * amount.length)
  let timeout = 600000;//10 mins

  let daily = await db.get(`cauldronTime-${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let timeEmbed = new MessageEmbed()
         .setColor("0A0301")
         .setDescription(`❌ You've already used Cauldron!\n\nUse it again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
         message.channel.send({embeds: [timeEmbed]})
       } else {
         
         let actions = ['You have successfully made a simmer pot!, so you have earned', 'You have not been successful in making a simmer pot...but you still earned']
         let outcome = actions[Math.floor(Math.random() * actions.length)] 
         
    const embed = new MessageEmbed();
    embed.setTitle('<:cgcd:957877549814382592> **The Cauldron is Bubbling!!** <:cgcd:957877549814382592>')
    embed.setColor('0A0301')
    embed.setThumbnail('https://i.postimg.cc/dQgWLzLT/cldrn.png')
    embed.setFooter('Tip! Keeping Crystals in your Altar increases your Protection!','https://i.postimg.cc/sDPbtgNj/onl.jpg')
    embed.setDescription(`Double bubble, toil and trouble... ${outcome} ${amountOutcome} <:cjbot:949247649079500880>`);
   message.channel.send({embeds: [embed]})

       db.add(`crescentJuice-${user.id}`, amountOutcome)
       db.set(`cauldronTime-${user.id}`, Date.now())
    }
  }
}
