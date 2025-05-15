const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { embedColor } = require("../../config.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "affirm",
    aliases: ['a'], //aliases are optional
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

      let user = message.author;

      db.on("ready", () => {
        console.log(`Fetched affirm Database from - userId: ${user.id}`);
      });
    
      // top-level awaits
      await db.connect(); 
    

    let timeout = 600000;//10 mins

    let daily = await db.get(`affirmTime-${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));
        let timeEmbed = new MessageEmbed()
                .setColor("0A0301")
                .setDescription(`❌ You've already got your affirmations for the day\n\nAffirm again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
            message.channel.send({embeds: [timeEmbed]})
    } else {

      let amount = [1, 2, 3, 4, 5, 6, 7, 8]
      let actions = ["*My courage is my biggest asset*", "*I am loved by many*", "*I am happy and healthy*", "*I manifest prosperity no matter the situation*", "*I have an abundance of money and it comes to me with ease*", "*I am as calm as the still earth under my feet*", "*I am my own cheerleader and I love who I am*", "*I am a confident and capable human being*"];
      let outcome = actions[Math.floor(Math.random() * actions.length)]
      let amountOutcome = amount[Math.floor(Math.random() * amount.length)] // this gets a random amount
  
      const embed = new MessageEmbed()
        .setTitle("**<:lime:930630936725426206>..You're looking for affirmations..<:lime:930630936725426206>**")
        .setAuthor(user.username, user.displayAvatarURL())
        .setThumbnail('https://i.postimg.cc/RVB4y6TQ/IMG-1382.jpg')
        .setDescription(`You earned ${amountOutcome}\ <:srltr:958805029861589054> affirmations and your affirmation is \n${outcome}!!\n**Keep doing your affirmations throughout the day to bring more positive energies into your life!!**\n*Note: However many affirmations you recieved is how many times a day you will say them!*`)
        .setColor("0A0301") // Set the color 
        .setFooter("Tip! Use ~affirm again in 10 minutes!","https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg");
  
      message.channel.send({embeds: [embed]});
        db.add(`affirmations-${user.id}`, amountOutcome)
        db.set(`affirmTime-${user.id}`, Date.now())
    }
  }
}
