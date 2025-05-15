const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "removebadge",
    aliases: ['removepermium'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

    let user = message.author;

    db.on("ready", () => {
      console.log(`Deleted premium Database from - userId: ${user.id}`);
    });
  
    // top-level awaits
    await db.connect(); 

    if(message.author.id === "875614809196998677" || "690007479404331076"){

      let userId = args[0]
      if(!userId){
        message.channel.send({content: `You must specify a user id to remove from premium!`})
      }
      if(userId){
        message.channel.send({content: `Succesfully Removed \`${userId}\` from Nixie Premium!`})
        await db.delete(`premium.users`, `${userId}`)
      }
    } else {
        message.channel.send({content: `You cannot use this command!`})
    }
  }
}
