const {MessageEmbed, MessageAttachment, Message, Client} = require("discord.js") 
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
  name: "wand",
  /**
  *
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */
  run: async (client, message, args) =>  {

    let user = message.author;


    db.on("ready", () => {
      console.log(`Fetched wand Database from - userId: ${user.id}`);
    });
  
    // top-level awaits
    await db.connect(); 

  let amount = [10, 13, 16]
  let amountOutcome = Math.floor(Math.random() * amount.length)
  let timeout = 600000;//10 mins

  let daily = await db.get(`wandTime-${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let timeEmbed = new MessageEmbed()
         .setColor("0A0301")
         .setDescription(`❌ You've already used Wand!\n\nUse it again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
         message.channel.send({embeds: [timeEmbed]})
       } else {
    const embed = new MessageEmbed();
    embed.setTitle('<:wizw:909111713511645214>**You Visualize a Silver White Light around You**...<:wizw:909111713511645214>')
    embed.setColor('0A0301')
    embed.setThumbnail('https://i.postimg.cc/8ccbkDR0/Screenshot-63.png')
    embed.setFooter('Tip! Keeping Crystals in your Altar increases your Protection!','https://i.postimg.cc/sDPbtgNj/onl.jpg')
    embed.setDescription(`Good Job! You have successfully cast a Circle of Protection and earned ${amountOutcome}\ Protection <:gpsh:956246336318095370> Points!\n**You can cast a circle every 10 minutes!**`);
   message.channel.send({embeds: [embed]})

       db.add(`protectionPoints-${user.id}`, amountOutcome)
       db.set(`wandTime-${user.id}`, Date.now())
    }
  }
}
