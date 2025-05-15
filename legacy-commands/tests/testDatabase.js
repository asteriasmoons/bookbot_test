const { MessageEmbed, Client, Message } = require('discord.js');
const { embedColor } = require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
  name: "testdatabase",
  aliases: ["td"],
  /**
  *
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */
run: async (client, message, args) => {


  db.on("ready", () => {
    console.log("Connected to the database");
  });

  // top-level awaits
  await db.connect(); 


    let user = message.author;

    let timeout = 86400000;
    let amount = 200;

    let daily = await db.get(`daily-${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let timeEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setDescription(`❌ You've already collected your daily affirmations\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
        message.channel.send({embeds: [timeEmbed]})
    } else {
      let moneyEmbed = new MessageEmbed()
          .setColor(embedColor)
          .setDescription(`✅ You've collected your daily affirmations of \`${amount}\` <:ebot:949503649174913024> !!`)
          .setFooter(`To view your current affirmations ballance use ~altar`);
      message.channel.send({embeds: [moneyEmbed]})
      db.add(`affirmations-${user.id}`, amount)
      db.set(`daily-${user.id}`, Date.now())
    }
  }
}
