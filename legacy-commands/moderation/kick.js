const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Kicks the user",
    accessableby: "Administrator",
    usage: "[name | nickname | mention | ID] <reason> (optional)",
    aliases: [],
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
            if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send({content: "**You Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**"});
            if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.send({content: "**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**"});

            if (!args[0]) return message.channel.send({content: '**Enter A User To Kick!**'})

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send({content: "**User Is Not In The Guild!**"});

            if (kickMember.id === message.member.id) return message.channel.send({content: "**You Cannot Kick Yourself!**"})

            if (!kickMember.kickable) return message.channel.send({content: "**Cannot Kick This User!**"})
            if (kickMember.user.bot) return message.channel.send({content: "**Cannot Kick A Bot!**"})

            var reason = args.slice(1).join(" ");
            try {
                const sembed2 = new MessageEmbed()
                    .setColor("0A0301")
                    .setDescription(`**You Have Been Kicked From ${message.guild.name} for - ${reason || "No Reason!"}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send({embeds: [sembed2]}).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("0A0301")
                .setDescription(`**${kickMember.user.username}** has been kicked for ${reason}`)
            message.channel.send({embeds: [sembed]});
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("0A0301")
                .setDescription(`**${kickMember.user.username}** has been kicked`)
            message.channel.send({embeds: [sembed2]});
            }
            let channel = await db.fetch(`modlog-${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#0A0301")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "kick")
                .addField("**User Kicked**", kickMember.user.username)
                .addField("**Kicked By**", message.author.username)
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
}