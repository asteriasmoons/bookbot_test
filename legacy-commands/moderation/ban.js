const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");
const ownerID = '875614809196998677' || '690007479404331076'

module.exports = {
    name: "ban",
    aliases: ["b", "banish"],
    description: "Bans the user",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
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

        try {
            if (!message.member.permissions.has("BAN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send({content: "**You Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"});
            if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({content: "**I Dont Have The Permissions To Ban Users! - [BAN_MEMBERS]**"});
            if (!args[0]) return message.channel.send({content: "**Please Provide A User To Ban!**"})

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send({content: "**User Is Not In The Guild**"});
            if (banMember === message.member) return message.channel.send({content: "**You Cannot Ban Yourself**"})

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send({content: "**Cant Ban That User**"})
            try {
            message.guild.members.ban(banMember)
            banMember.send({content: `**Hello, You Have Been Banned From ${message.guild.name} for - ${reason || "No Reason"}**`}).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("#0A0301")
                .setDescription(`**${banMember.user.username}** has been banned for ${reason}`)
            message.channel.send({embeds: [sembed]})
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("#0A0301")
                .setDescription(`**${banMember.user.username}** has been banned`)
            message.channel.send({embeds: [sembed2]})
            }
            let channel = await db.fetch(`modlog-${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#0A0301")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [embed]})
        } catch (e) {
            return message.channel.send({content: `**${e.message}**`})
        }
    }
};