const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { embedColor } = require("../../config.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "manifest",
    aliases: ['m'], //aliases are optional
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

      let user = message.author;

      db.on("ready", () => {
        console.log(`Fetched manifest Database from - userId: ${user.id}`);
      });
    
      // top-level awaits
      await db.connect(); 

    let timeout = 300000;//5 mins

    let amount = [1, 10, 20, 30, 60, 90, 110] // amount avaliable
    let amountOutcome = amount [Math.floor(Math.random() * amount .length)] // this gets a random amount

    let daily = await db.get(`manifestTime-${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let timeEmbed = new MessageEmbed()
            .setColor("0A0301")
            .setDescription(`❌ You've already manifested\n\nManifest again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
        message.channel.send({embeds: [timeEmbed]})
    } else {

      let actions = ["did a pendulum reading for a client <:pend:933046351657312348> and they were very happy with their answer", "made a potion for a client <:rbt:954966999199531028> so they could manifest abundance", "did a tarot reading for a client <:t2:954427242732200026> and they now understand how to communicate in their relationships", "did a tea leaf reading for a client <:astro:952039544973308014> and they were amazed by your skills.", "sold some crystals to a client <:crsp:957534726627922041> and they really liked the moonstone the best", "did a candle wax reading for a client <:rcan:908073843602628618> and they asked you how you could possibly get all that information from candle wax, they were confused", "You put together a grimoire for a client <:dvntn:957112387083849758> and they were very pleased  with the results", "You made a magic brew in your cauldron for a client <:cgcd:957877549814382592> and they were astounded when they got the phone call they wanted!"];
      let outcome = actions[Math.floor(Math.random() * actions.length)] // this gets a random action
  
      const embed = new MessageEmbed()
        .setTitle("**✦Manifesting✧…**")
        .setThumbnail('https://i.postimg.cc/CKGxzGJ1/img.png')
        .setAuthor(user.username, user.displayAvatarURL())
        .setDescription(`You ${outcome} **and you earned ${amountOutcome} <:msoda:955233907719143444> !! Keep Manifesting to buy Moonshop items!!**`)
        .setColor("0A0301") // Set the color 
        .setFooter("Tip! Manifest again in 5 minutes!","https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg");
  
      message.channel.send({embeds: [embed]});
        db.add(`moonSoda-${user.id}`, amountOutcome)
        db.set(`manifestTime-${user.id}`, Date.now())
    }
    
  }
}
