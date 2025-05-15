const {MessageEmbed, MessageAttachment, Message, Client} = require("discord.js") 
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
  name: "wish",
  aliases: ["w"],
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

  let amount = [1, 2, 3]
  let amountOutcome = Math.floor(Math.random() * amount.length) 

  let timeout = 900000;//5 mins

  let daily = await db.get(`wishTime-${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let timeEmbed = new MessageEmbed()
          .setColor("0A0301")
          .setDescription(`❌ You've already wished\n\nwish again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
      message.channel.send({embeds: [timeEmbed]})
  } else {

    const embed = new MessageEmbed() 
    .setColor("0A0301") 
    .setThumbnail('https://i.postimg.cc/JnNgNGxc/unnamed.png')
    .setTitle("<:sscb:955144497392652339>...You make a wish to the universe...<:sscb:955144497392652339>") 
    .setDescription(`You wished on a floating Starcandy\nThe universe has heard you ||**and granted you with \`${amountOutcome}\`<:scct:954827658762522654>**||\nUse your Starcandy in the ~starcandyshop!!`) 
    .setFooter("Tip! You can wish again in 15 minutes!","https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg")  

    message.channel.send({embeds: [embed]});
      db.add(`starCandy-${user.id}`, amountOutcome)
      db.set(`wishTime-${user.id}`, Date.now())
  };
  }
}
