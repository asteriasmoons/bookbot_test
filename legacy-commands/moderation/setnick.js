const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "setnick",
    aliases: ["sn", 'nick'],
    category: "moderation",
    description: "Sets Or Changes Nickname Of An User",
    usage: "[mention | name | nickname | ID] <nickname>",
    /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {

        db.on("ready", () => {
            console.log(`Fetched ban Database from - ServerId: ${message.guild.id}`);
          });
        
          // top-level awaits
        await db.connect(); 

        if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "**You Dont Have Permissions To Change Nickname! - [MANAGE_GUILD]**"});

        if (!message.guild.me.permissions.has("CHANGE_NICKNAME")) return message.channel.send({content: "**I Dont Have Permissions To Change Nickname! - [CHANGE_NICKNAME]**"});
      
        if (!args[0]) return message.channel.send({content: "**Please Enter A User!**"})
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send({content: "**Please Enter A Username!**"});

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send({content: '**Cannot Set or Change Nickname Of This User!**'})

        if (!args[1]) return message.channel.send({content: "**Please Enter A Nickname**"});

        let nick = args.slice(1).join(' ');

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("#0A0301")
            .setDescription(`**Changed Nickname of ${member.displayName} to ${nick}**`)
        message.channel.send({embeds: [embed]})
        } catch {
            return message.channel.send({content: "**Missing Permissions - [CHANGE_NICKNAME]"})
        }

        let channel = await db.fetch(`modlog-${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#0A0301")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "setnick")
            .addField("**Nick Changed Of**", member.user.username)
            .addField("**Nick Changed By**", message.author.username)
            .addField("**Nick Changed To**", args[1])
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [sembed]})
    }
}