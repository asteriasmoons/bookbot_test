const { Client, MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");
const { embedColor } = require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "newsuggestion",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 
        
        let user = message.author;

        db.on("ready", () => {
            console.log(`Fetched vote Database from - userId: ${user.id}`);
          });
        
          // top-level awaits
          await db.connect(); 
        
        const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('suggestbuttonyes')
                    .setLabel('Absolutely')
                    .setStyle('SECONDARY')
                    .setEmoji('<:gpsh:956246336318095370>'),
                )
                .addComponents(
                    new MessageButton()
                    .setCustomId('suggestbuttonno')
                    .setLabel('Absolutely Not')
                    .setStyle('SECONDARY')
                    .setEmoji('<:npsh:958381321367998495>'),
                );

      let answer = ["**Your suggestion has been submitted to the Devs and Owner and sent to the suggestions <:strdst:957112227226341386> channel!**"]
      
      const suggestion = args.join(' ');
      if(!suggestion) return message.channel.send({content: "Hello love, **please give your suggestion!**"})

      message.channel.send({content: `${answer}`});
        

      const Channel = client.channels.cache.get('959831168616898590');
        

        const filter = message => message.customId === 'primary' && message.user.id === '690007479404331076';

        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async button => {
            if (button.customId === 'secondary') {
                await message.update({ content: '**Thanks for Voting on this suggestion!**', components: [] });
            }
        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        
      const embed = new MessageEmbed()   
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setColor("0A0301") 
          .setTitle("<:nixm:959126078222372914> **New Suggestion** <:nixm:959126078222372914>")
          .addField(`<:ihrt:959695755008958484>Suggestion:<:ihrt:959695755008958484>`, `${suggestion}`)
          .setThumbnail("https://i.postimg.cc/4NpCcjg8/sggt.jpg")
          .setFooter(`From: ${message.guild.name} | Id: ${message.guild.id}`, "https://i.postimg.cc/PxnYCLzV/Screenshot-66.png")
        return Channel.send({embeds: [embed], components: [row]}) // send the embed in the channel the command was ran in.
    }
}
