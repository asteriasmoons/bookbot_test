const { afk } =  require('../../Collection')
const { MessageEmbed, Message, Client } =  require('discord.js');

module.exports = {
    name: "afk",
    description: "sets server user afk",
      /**
       *
       * @param {Client} client
       * @param {Message} message
       * @param {String[]} args
       */
    run: async (client, message, args) => {

        const reason =  args.join(' ') || 'no reason given'
        const user =  message.member
        
        afk.set(message.author.id, [Date.now(), reason])
        const embed = new MessageEmbed()
        .setTitle(`You have been set to AFK mode!`)
        .setDescription(`For: ${reason}`)
        .setTimestamp()
        .setColor("#0A0301")
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        message.channel.send({embeds: [embed]});
    }
}