const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ms = require("parse-ms");
const { embedColor } = require('../../config.js');

module.exports = {
    name: "balance",
    aliases: ["bal"],
    description: "Shows Current Balance of a user",
    usage: `bal`,   
        /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async ( client, message, args ) => {

        let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r =>
            r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.member;
  
      let bal = db.fetch(`affirmations_${user.id}`);
  
      if (bal === null) bal = 0;
  
      if (user) {
        let moneyEmbed = new MessageEmbed()
          .setColor(embedColor)
          .setDescription(
            `**${user.user.username}'s Balance**\n\nTotal affirmations: ${bal}`
          )
          .setFooter(`To view everything use ~altar`);
        message.channel.send({embeds: [moneyEmbed]});
      } else {
        return message.channel.send({content: "**Enter A Valid User!**"});
      }

    }
}