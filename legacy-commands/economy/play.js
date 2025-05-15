const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { embedColor } = require("../../config.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "play",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

    let user = message.author;

    db.on("ready", () => {
      console.log(`Fetched play Database from - userId: ${user.id}`);
    });
  
    // top-level awaits
    await db.connect(); 

    let timeout = 600000;//10 mins

    let amount = [3, 6, 9, 12, 15] // amount avaliable
    let amountOutcome = amount [Math.floor(Math.random() * amount .length)] // this gets a random amount

    let daily = await db.get(`playTime-${user.id}`);

     if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let timeEmbed = new MessageEmbed()
            .setColor("0A0301")
            .setDescription(`❌ You've already played with your pet\n\nPlay again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
        message.channel.send({embeds: [timeEmbed]})
    } else {

      let actions = ["read your pet a bedtime story and they fell asleep", "baked some starcakes with your pet but they ate them all", "did a tarot reading for your pet and they gave you big huggies", "had a tea party with your pet and they got too hyper from the matcha", "took your pet crystal shopping and they bought all of the moonstone", "taught your pet how to anoint a candle but they got essential oil all over their paws"];
      let outcome = actions[Math.floor(Math.random() * actions.length)] // this gets a random action
  
      const embed = new MessageEmbed()
        .setTitle("**Yippie! Its Play Time!**")
        .setAuthor(user.username, user.displayAvatarURL())
        .setDescription(`You ${outcome} **and you earned ${amountOutcome} <:tpu:930630862951817226> pet satisfaction!!**`)
        .setColor("0A0301") // Set the color 
        .setFooter("Tip! You can play again in 10 minutes!","https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg");
  
      message.channel.send({embeds: [embed]});
        db.add(`petSatisfaction-${user.id}`, amountOutcome)
        db.set(`playTime-${user.id}`, Date.now())
    }
    
  }
}
