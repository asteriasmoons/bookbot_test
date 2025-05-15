const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { embedColor } = require("../../config.js");

module.exports = {
    name: "suggest",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

      let answer = ["**Your suggestion has been submitted to the Devs and Owner and sent to the suggestions <:strdst:957112227226341386> channel!**"]
      
      const suggestion = args.join(' ');
      if(!suggestion) return message.channel.send({content: "Hello love, **please give your suggestion!**"})

      message.channel.send({content: `${answer}`});

      const Channel = client.channels.cache.get('959831168616898590');

      const embed = new MessageEmbed()   
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor("0A0301") 
          .setTitle("<:hrbk:957747877910818846> **NEW SUGGESTION!** <:hrbk:957747877910818846>")
          .addField(`Suggestion:`, `${suggestion}`)
          .setThumbnail("https://i.postimg.cc/rsRnpZhC/IMG-2597.jpg")
          .setFooter(`From: ${message.guild.name} | Id: ${message.guild.id}`, "https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg")
      Channel.send({embeds: [embed]}) // send the embed in the channel the command was ran in.
  }
}
