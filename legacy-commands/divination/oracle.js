const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { embedColor } = require("../../config.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "oracle",
    aliases: ['o'], //aliases are optional
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

      let user = message.author;

      db.on("ready", () => {
        console.log(`Fetched oracle Database from - userId: ${user.id}`);
      });
    
      // top-level awaits
      await db.connect(); 
    

    let timeout = 120000;//2 mins

    let daily = await db.get(`oracleTime-${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));
        let timeEmbed = new MessageEmbed()
                .setColor("0A0301")
                .setDescription(`❌ You've already asked a question to the oracle\n\nAsk again in ${time.hours}h ${time.minutes}m ${time.seconds}s!!`);
            message.channel.send({embeds: [timeEmbed]})
    } else {
  
      // now make your answers
      let predictions = [
      "The situation you are asking about is blessed, and you are on target to achieve your goals!",
      "Before your next step make sure you and the situation feel healed.",
      "Talking things through is the answer to whatever you are asking about",
      "You're time to rest and reset is here. Release all that does not serve you; stop resisting.",
      "With self awareness comes realization. Knowledge is power. Self examination of your role within a situation is important.",
      "The past does not exist, the future hasn't happened, there is only right now.",
      "Reject stagnancy; to get unstuck, take action. The choice to grow should  be made.",
      "Something precious is all about you, but it has become so familiar you can barely see it anymore. It is such a fixture in your life that familiarity has bred, if not contempt, a kind of blindness.",
      "Stop! Stop right now! Your intuition-your inner sight and clear vision, is sending you a very clear warning. A red flag has just gone up and this is the time to stop, to look, and listen before going forward.",
      "A perfect solution to a problem has been presented to you. Whether it is wise to take it is another thing altogether..",
      "Time to stop relying on others for that comfort, warmth and sustenance, that only true self love can bring.",
      "Something that has just happened will happen twice, then three times...",
      "A deeply emotional energetic shift, akin to that of a powerfull full eclipse, is taking place in your life.",
      "You may soon be experiencing some little reminders, of the sweetest, most fun and uplifting times in your life: the kind that have no great significance historically, but in the story that is your life, they are pivotal moments.",
      "There is gossip and intrigue around a person you admire, and wish to be like in some way. The message is to focus on your own hard work, and to create your own style.",
      "One dilemma with living in a world you feel you must protect is that you fear other people intruding on it, disturbing the delicate balance.",
      "There may be health challenges for you at the present time. Regardless of what you or one dear to you may be experiencing it is time to ask yourself, *What would I do if I knew I had a short time left to live on this planet?*",
      "Face the sudden change, upheaval, regret, bitterness and accept that it is over. The answer is no. Forget the past and head in another direction.",
      "Be prepared for a difficult time but do not project your fears and obsessions.",
      "You need someone to back right off and give you space.",
      "With fresh hope after a difficult time, something new breaks through and shows evidence of its approach and, with it, your new reality.",
      "A way through a life challenge will present itself. Stubborn thinking can be changed. Old patterns are being removed, little by little, but will need trust.",
      "Part of you that is natural and beautiful, most likely your body and appearance, has been influenced by thoughts and ideas about it being unworthy, unhealthy and perhaps even dirty! It is time to clean up your act! Not of your natural looks but the way you have thought about yourself.",
      "There is a very out of balance relationship between you and another at this time. It is time to truthfully assess this relationship and take steps to be safer, more protected and more respected.",
      "Sentimentality, holding onto the past, idealizing the past, refusing, not allowing yourself to get over a break up with a friend, a move to a new town, faded romance, parents who have divorced, something you are convinced you must have back in order to be happy again. Mourning for what was and what should have been. Very deep sadness and yet this experience has been of great value. It is time to move on and to place all of that to rest.",
      "Time to get back to earth, get grounded, to work through any negative feelings you've been dealing with and to find a balance between being passionate and being overly intense.",
      "Find a balance between your desires and those of the people around you.",
      "Its as though your headed in one direction, probably being guided by your ego, and then here comes the Divine, the Goddess, to turn and face you in the direction that you actually need to go.",
      "Now is the time to make plans and act on them.",
      "A wonderful bounty is on its way though you need to set your focus on getting your life in order too.",
      "You are in the more tranquil point of whatever situation you are asking about, this is not the idea time to start something new.",
      "There could be some challenges coming your way but, its just the Universe's way of testing you!",
      "There is a sense that the situation has become tense, so, don't push too hard. One false move and the whole thing could blow..",
      "Radical self love is necessary. Empowerment starts from the inside out. Do not compare yourself to others. Start your change with focus and love of self",
      "Choose to nourish your mind, body and spirit. Feed your values. When you are jealous or envious it is a sign of what you are actually hungering for. Pay attention to your health.",
      "The way is open for you, the path is illuminated. Begin the journey now. Respond and take action. We must be courageous and move forward.",
      "Take care in your choices now. Look carefully and judge wisely. There may have been something difficult to see. Something that has been obscured but now it has been revealed to you. Examine it closely."
      ]
      
      let amount = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] //this is the amounts you set to be random
      let amountOutcome = Math.floor(Math.random() * amount.length) //this gets a roundom amountOutcome
     
      const question = args.join(' ');
      if(!question) return message.channel.send({content: "**Welcome to the Oracle, please ask your question...**"})


      let answer = predictions[Math.floor(Math.random() * predictions.length)];

      const embed = new MessageEmbed()   
          .setAuthor(user.username, user.displayAvatarURL())
          .setColor("0A0301") 
          .setTitle("<:orcle:957670996331094036>..**You have asked the great Oracle Seer a question!**..<:orcle:957670996331094036>")
          .setDescription(`The Great Oracle Seer says... ** ${answer} ** You earned ${amountOutcome} Magic Grimoire(s)! <:dvntn:957112387083849758>\n*You can always ask another question anytime!*\n**Note: Do not fret about the answer! The future is not set in stone and you have the power to change the outcome!**\n*It is up to you how you interpret the phrase you have recieved.*`)
          .addField(`Question:`, `${question}`)
          .addField(`Answer:`, `${answer}`)
          .setThumbnail("https://i.postimg.cc/wM9jpGSs/IMG-2868.jpg")
          .setFooter("Note! As time goes on I will keep adding more and more to the Oracle!", "https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg")
          
      message.channel.send({embeds: [embed]}) // send the embed in the channel the command was ran in.
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // If you renmaed your embed, 
    // replace embed with its new name.
    db.add(`grimoire-${user.id}`, amountOutcome)
    db.set(`oracleTime-${user.id}`, Date.now())
  }
}
}
