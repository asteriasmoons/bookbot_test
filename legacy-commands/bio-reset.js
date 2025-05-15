const { MessageEmbed, Client, Message} = require("discord.js");
const { readdirSync } = require("fs");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");


module.exports = {
  name: "bio-reset",
  aliases: ['del-bio', 'biography-del', 'res-bio', 'reset-bio'],
  description: "Shows all available bot commands.",
      /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
  run: async (client, message, args) => {

    db.on("ready", () => {
        console.log(`Delated Biography Database from - userId: ${message.author.id}`);
          });
    
    await db.connect();

   await db.delete(`biography-${message.author.id}`)
      const aembed = new MessageEmbed()
   .setDescription("<:tsib:949512778358599740> **Successfull** <:tsib:949512778358599740>\n\n **Successfully Deleted Your Bio**\nWant to write a new one? use \`~bio-set\`")
   
   message.channel.send({embeds: [aembed]});

  }
}
