const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "premiumlist",
    aliases: ['badgelist'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

      let user = message.author;

    db.on("ready", () => {
      console.log(`Fetched premium Database from - userId: ${user.id}`);
    });
  
    // top-level awaits
    await db.connect(); 

    if(message.author === "875614809196998677" || "690007479404331076"){

        const allUsers = await db.get(`premium.users`)

        message.channel.send({content: `All premium users:\n\`\`\`${allUsers}\`\`\``})
        
    } else {
      message.channel.send({content: 'You cannot use this command!!'})
    }
  }
}
