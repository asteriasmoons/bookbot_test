const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "warn",
    description: "warn members",
    usage: "m/warn <mention member/member id> [reason]",
    aliases: [],
    /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
        let warnPermErr = new MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")
            if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send({embeds: [warnPermErr]});
    
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if(!member) return message.reply({content: "Please mention a valid member of this server"});
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "(No Reason Provided)";
            
            member.send({content: `You have been warned by <${message.author.username}> for this reason: ${reason}`})
            .catch(error => message.channel.send({content: `Sorry <${message.author}> I couldn't n't warn because of : ${error}`}));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Warn Report__**")
            .setColor("#0A0301")
            .setDescription(`**<@${member.user.id}> has been warned by <@${message.author.id}>**`)
            .addField(`**Reason:**`, `\`${reason}\``)
            .addField(`**Action:**`, `\`Warn\``)
            .addField(`**Moderator:**`, `${message.author}`)

            message.channel.send({embeds: [warnEmbed]})

    }
}