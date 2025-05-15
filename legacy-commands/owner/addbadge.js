const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "addbadge",
    aliases: ['addpermium'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

      let user = message.author;

    db.on("ready", () => {
      console.log(`Fetched permium Database from - userId: ${user.id}`);
    });
  
    // top-level awaits
    await db.connect(); 

    if(message.author === "875614809196998677" || "690007479404331076"){

      let userId = args[0]
      if(!userId){
        message.channel.send({content: `You must specify a user id to add to peremium!`})
      }
      if(userId){
        message.channel.send({content: `Succesfully added \`${userId}\` to Nixie Premium!`})
        await db.push(`premium.users`, `${userId}`)
      }
    } else {
      message.channel.send({content: 'You cannot use this command!!'})
    }
  }
}
