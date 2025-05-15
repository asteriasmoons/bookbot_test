const { MessageEmbed, Message, MessageAttachment, Client } =  require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "horoscope",
    aliases: ["horo"],
     /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async ( client, message, args ) => {

        const horoImput = args[0]; 
        const dayImput = args[1];

        if(!horoImput) return;
        if(!dayImput) return; 
        
        var { description, current_date, color, compatibility, lucky_number, date_range, lucky_time } = await fetch(`https://aztro.sameerkumar.website/?sign=${horoImput}&day=${dayImput}`, {method: 'post'}).then(response => response.json());

        const embed = new MessageEmbed()
        .setTitle('<:msoda:955233907719143444> **Horoscopes!** <:msoda:955233907719143444>')
        .setColor('0A0301')
        .setThumbnail('https://i.postimg.cc/HxMdwNLc/Screenshot-41.png')
        .addField(`<:prbs:934689480839933952> Sign:`, `${horoImput}`)
        .addField(`<:icp:956382071050342400> Current_date:`, `${current_date}`)
        .addField(`<:ucp:957444498311508060> Color:`, `${color}`)
        .addField(`<:gcp:957444479156097024> Lucky Number:`, `${lucky_number}`)
        .addField(`<:tcp:957444456724967494> Lucky Time:`, `${lucky_time}`)
        .addField(`<:perple:930629942134325258> Compatibility:`, `${compatibility}`)
        .addField(`<:peenk:930629880851341323> Description:`, `${description}`)
        .addField(`<:boo:930629975411929188> Date Range:`, `${date_range}`)

        return message.channel.send({embeds: [embed]});

    }
}
