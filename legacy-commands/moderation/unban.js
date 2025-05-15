const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "unban",
    description: "Unban a user from the guild!",
    usage: "[name | tag | mention | ID] <reason> (optional)",
    aliases: ["ub", "unbanish"],
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

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({content: "**You Dont Have The Permissions To Unban Someone! - [BAN_MEMBERS]**"})

        if (!args[0]) return message.channel.send({content: "**Please Enter A Name!**"})
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send({content: "**Please Provide A Valid Username, Tag Or ID Or The User Is Not Banned!**"})

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({content: "**I Don't Have Permissions To Unban Someone! - [BAN_MEMBERS]**"})
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setColor("#0A0301")
                    .setDescription(`**${bannedMember.user.tag} has been unbanned for ${reason}**`)
                message.channel.send(sembed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                    .setColor("#0A0301")
                    .setDescription(`**${bannedMember.user.tag} has been unbanned**`)
                message.channel.send(sembed2)
            }
        } catch {
            
        }

        let channel = await db.fetch(`modlog-${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("#0A0301")
            .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Moderation**", "unban")
            .addField("**Unbanned**", `${bannedMember.user.username}`)
            .addField("**ID**", `${bannedMember.user.id}`)
            .addField("**Moderator**", message.author.username)
            .addField("**Reason**", `${reason}` || "**No Reason**")
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send({embeds: [embed]})
    }
}