const { Client, MessageEmbed, Message, MessageActionRow } = require("discord.js");
const { interaction } = require ('../../events/interactionCreate.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "drop",
    aliases: ['d'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     * @param {Collection} collection The items collected by this collector
     * @property {CollectorFilter} [filter] The filter applied to this collector
     */
    run: async (client, message, args) => {

        let user = message.author;

        db.on("ready", () => {
        console.log(`Fetched drop Database from - userId: ${user.id}`);
          });

          await db.connect(); 
	
	let reply = new MessageEmbed() 
	let amount = [9, 12, 15]
        let amountOutcome = Math.floor(Math.random() * amount.length)
	    
	const embed = new MessageEmbed()
	.setColor('0A0301')
        .setThumbnail('https://i.postimg.cc/TwPc6qwH/potionbtl.jpg')
        .setTitle('<:rbt:954966999199531028>**POTION DROP!!**<:rbt:954966999199531028>')
        .setDescription('**QUICK!!** Nixie dropped a potion! <:tpsh:955321772058763305> Click the emoji to grab some potions!! **You can use potions when buying items from the ~petshop! The items to be featured are coming soon!!**');
        await message.channel.send({ content: `You grabbed ${amountOutcome} Potions!`});
	const filter = message => message.content.has('claim')
	     const collector = message.createMessageComponentCollector({ componentType: 'STRING', time: 15000 });
	      collector.on('collect', m => {
		      console.log(`Collected', ${message.content}`);
	      });
	    message.channel.send({embeds: [embed]})
    }
};
