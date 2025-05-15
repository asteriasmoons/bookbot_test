const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { embedColor } = require("../../config.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "pendulum",
    aliases: ['pd'], //aliases are optional
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

      let user = message.author;

      db.on("ready", () => {
        console.log(`Fetched pendulum Database from - userId: ${user.id}`);
      });
    
      // top-level awaits
      await db.connect(); 
    

    let timeout = 120000;//2 mins

    let daily = await db.get(`pendulumTime-${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));
        let timeEmbed = new MessageEmbed()
                .setColor("0A0301")
                .setDescription(`❌ You've already asked a question to pendulum\n\nAsk again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
            message.channel.send({embeds: [timeEmbed]})
    } else {
  
      // now make your answers
      let predictions = [
      "Yes",
      "Ask Again Later",
      "Obviusly!",
      "Probably Not",
      "Please Ask Again Later",
      "The Future Is Looking Great!",
      "Things Are Not Clear To Me..",
      "Go Forth & Find Out",
      "No, Sorry",
      "There are chances.." // and so go on with it if you want to.
      ]
      
      let amount = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] //this is the amounts you set to be random
      let amountOutcome = Math.floor(Math.random() * amount.length) //this gets a roundom amountOutcome
     
      const question = args.join(' ');
      if(!question) return message.channel.send({content: "Hello love, **please ask your question.**"})


      let answer = predictions[Math.floor(Math.random() * predictions.length)];

      const embed = new MessageEmbed()   
          .setAuthor(user.username, user.displayAvatarURL())
          .setColor("0A0301") 
          .setTitle("<:pend:933046351657312348>..**You asked the Pendulum a question! You're questions has been heard by the Divine!**..<:pend:933046351657312348>")
          .setDescription(`The answer you got: ${answer} and so you earned ${amountOutcome} bag of Stardust! <:strdst:957112227226341386>\n*Make sure to keep asking the Pendulum questions to earn Stardust to use in your spells!*\n**Note: Don't worry about your answer! Nothing is set in stone and you have the power to change the future! Keep your head up regardless!**`)
          .addField(`Question:`, `${question}`)
          .addField(`Answer:`, `${answer}`)
          .setThumbnail("https://i.postimg.cc/NLvHnSWr/64-A352-A1-737-C-4-C00-8-F6-D-2-C663-B31-E453.jpg")
          .setFooter(":3", "https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg")
          
      message.channel.send({embeds: [embed]}) // send the embed in the channel the command was ran in.
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If you renmaed your embed, 
    // replace embed with its new name.
    db.add(`starDust-${user.id}`, amountOutcome)
    db.set(`pendulumTime-${user.id}`, Date.now())
  }
}
}
