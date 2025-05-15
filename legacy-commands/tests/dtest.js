const { Client, MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");
const { prefix } = require('../../config.js')


module.exports = {
    name: "dtest",
    aliases: ['dtst'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let user = message.author;
        let author = user

        db.on("ready", () => {
        console.log(`Fetched drop Database from - userId: ${user.id}`);
          });

          await db.connect(); 
        
        //if(!message.member.permissions.has("ADMINISTRATOR")) return;
        const channel = message.mentions.channels.first();
        if(!channel) return message.reply({content: `Please mention a channel!`});

        const amount = [9, 12, 15]
        const coinAmount = Math.floor(Math.random() * amount.length)

        const filter = (msg) => 
            msg.guild.id === message.guild.id && msg.content === `claim`;
        message.channel.send({content: `The drop started in ${channel.toString()}`});
        channel.send({content: `Here comes a random <:potbt:954966999199531028> potion drop! Use \`claim\` to claim the amount of potions`});

        channel.awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] }).then(async (collected, msg) => {
            const id = msg.author
            const coinsToClaim = parseInt(coinAmount);
            res.status(201).send({ err })

            client.add(id, coinsToClaim);
            msg
            .first()
            if(msg.content === 'claim') return message.reply({content: `${collected.first().author} claimed the <:rbt:954966999199531028> potions!\n\nCongrats! You have claimed ${coinsToClaim} <:rbt:954966999199531028> potions!!\n**You can use potions when buying items from the ~petshop! The items to be featured are coming soon!!**`});
        })
        
    },
    
};
