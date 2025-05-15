const { Message, Client, MessageEmbed } = require("discord.js");
const { embedColor } = require('../../config.js');

module.exports = {
    name: "moon",
    aliases: ['phase', 'luna'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        var MoonCalc = require('../../api/models/mooncalc');

        var date = new Date();
        const moonstats = MoonCalc.datasForDay(date);
  
  
        const embed =  new MessageEmbed()
        .setColor(embedColor)
        .setTitle(`<:nixm:959126078222372914> | Moon Calculator | ${moonstats.phase} | ${moonstats.emoji} | <:nixm:959126078222372914>`)
        .addField(`<:wsm:956266167335534692> Info: <:wsm:956266167335534692>`, `Date: \`${moonstats.date.year}, ${moonstats.date.month}, ${moonstats.date.day}\`\nAge: \`${moonstats.age}\`\nDistance: \`${moonstats.distance}\``)
        .addField(`<:wsm2:956266132002730055> Ecliptic: <:wsm2:956266132002730055>`, `Latitude: \`${moonstats.ecliptic.latitude}\`\nLongitude: \`${moonstats.ecliptic.longitude}\``)
        .addField(`<:wm1:930631020305322065> Other: <:wm1:930631020305322065>`, `Phase: ${moonstats.phase}\nTrajectory: ${moonstats.trajectory}\nConstellation: ${moonstats.constellation}`)
        .addField(`<:wm:902979216478470184> Description: <:wm:902979216478470184>`, `${moonstats.description}`)
        .addField(`\u200B`, `${moonstats.emoji} | Made with moon API from [Cabot](https://cabot-bot.xyz/)`)
  
        await message.channel.send({embeds: [embed]});
    },
};
