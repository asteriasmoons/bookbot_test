const { Client, MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");
const { prefix } = require('../../config.js')


module.exports = {
    name: "testdrop",
    aliases: ['td'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let user = message.author;
        let author = (user.id);

        db.on("ready", () => {
        console.log(`Fetched drop Database from - userId: ${user.id}`);
          });

          await db.connect(); 
        
        //if(!message.member.permissions.has("ADMINISTRATOR")) return;
        const Channel = message.mentions.channels.first();
        if(!Channel) return message.reply({content: `Please mention a channel!`});

        const amount = [9, 12, 15]
        const coinAmount = Math.floor(Math.random() * amount.length)

        const Msgfilter = msg => 
            msg.guild.id === message.guild.id && msg.content === `claim`;
        message.channel.send({content: `The drop started in ${Channel.toString()}`});
        Channel.send({content: `Here comes a random <:rbt:954966999199531028> potion drop! Use \`claim\` to claim the amount of potions`});

        const collector = Channel.createMessageCollector({ Msgfilter, max: 1, time: 60000 });

        const coinsToClaim = parseInt(coinAmount);   
        collector.on('collect', msg => {
            console.log(`Collected ${msg.content}`);
            msg.reply({content: `Congrats! You have claimed ${coinsToClaim} <:rbt:954966999199531028> potions!!\n**You can use potions when buying items from the ~petshop! The items to be featured are coming soon!!**`});
         db.add(`potion-${user.id}`, coinsToClaim);

        });
        
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    },
};
