const { Client, MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");
const { embedColor } = require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "vote",
    aliases: ['upvote'],
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

        const botId = client.user.id; // get the client (bot) id
        const uId = message.author.id; // get the author id

        const url = `https://top.gg/api/bots/946250414196662282/check?userId=${uId}`; // api endpoint

        await fetch(url, { method: "GET", headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk0NjI1MDQxNDE5NjY2MjI4MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjQ3NDUwMzE2fQ.XdYJOKKX8cNzWI4XK3J5_1kLMJ4C4RRiPbKi1xlwzig" }})
        .then((res) => res.text())
        .then((text) => {
            var isVoted = JSON.parse(text).voted;

            if (isVoted === 0) {
                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Top.gg')
                    .setStyle('LINK')
                    .setURL('https://top.gg/bot/946250414196662282'),
                );

                const embed = new MessageEmbed()
                .setTitle(`**You've Not Yet Voted For Nixie!**`)
                .setThumbnail('https://i.postimg.cc/hPKPhy57/IMG-9167.jpg')
                .setColor(embedColor) // Set the color
                .setDescription(`<:alnc:953358975892611154>[**Vote Nixie!! Get Magic Tickets!!**](https://top.gg/bot/946250414196662282/vote)<:vtbot:947767487594909716>\n**Voting for Nixie gives you two Magic Tickets each time, save them to buy a Pet Dragon!!**`)
                .setFooter(`Click on the button below!`, `https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg`)
            return message.channel.send({embeds: [embed], components: [row]});
            }
            else if (isVoted === 1) {
                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Nixie Support')
                    .setStyle('LINK')
                    .setURL('https://discord.gg/nixiesether'),
                );
    
                const embed = new MessageEmbed()
                .setTitle(`**<:alnf:953358917872779294>You have already Voted for Nixie!!<:alnf:953358917872779294>**`)
                .setThumbnail('https://i.postimg.cc/hPKPhy57/IMG-9167.jpg')
                .setColor(embedColor) // Set the color
                .setDescription(`Thank you so very much for voting for Nixie!\n**You will recieve two magic tickies (tickets)!**\n*Voting really really helps more people see and get exposure to the bot so it can grow abundantly.*\n**Remember your magic tickets can buy you a pet dragon too!**`)
                .setFooter(`Make sure to join our support server!`, 'https://i.postimg.cc/vZ54tmTv/A8-D9-EAA2-C9-BB-4509-90-B3-F4-D383-BC80-FE.jpg')
            
            db.add(`tickets-${user.id}`, 2)
            return message.channel.send({embeds: [embed], components: [row]});
            }

        });
    }
}
