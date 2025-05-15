const { Message, Client, MessageEmbed } = require('discord.js');
const moment = require('moment');
const { embedColor } = require('../../config.js');

const channelType = {
    dm: 'DM'
};


module.exports = {
    name: "channelinfo",
    aliases: ['ci', 'channel'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

        if(!channel)
        return message.reply({content: `Provide a valid channel or channel from this server not from other server !! **\`-channelinfo [Channel Form this server]\`**`})
    
        const totalUsers = channel.members.size;
        const NFSW = {
            true: 'Yes',
            false: 'No'
        }
        
        const embed = new MessageEmbed()
        .setTitle('Channel Info !!')
        .addField('Name', `${channel}`, true)
        .addField('ID', `\`${channel.id}\``, true)
        .addField('Type', `\`${channel.type}\``, true)
        .addField('Users', `\`${totalUsers}\` Users`, true)
        .addField('Creation Date', `\`${moment(channel.createdAt).format('DD/MMM/YYYY')}\``, true)
        .addField('NSFW ', `\`${NFSW[channel.nsfw]}\``, true)
        .setColor(embedColor)
        .setTimestamp()
    
        message.channel.send({embeds: [embed]})

    }
}