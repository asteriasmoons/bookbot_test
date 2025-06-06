const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "unmute",
    aliases: ["um"],
    description: "Unmutes a member in the discord!",
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

        if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "**You Dont Have The Permissions To Unmute Someone!**"});

        if (!message.guild.me.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "**I Don't Have Permissions To Unmute Someone!**"})
        if (!args[0]) return message.channel.send({content: "**Please Enter A User!**"})
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.channel.send({content: "**Please Enter A Valid User!**"});

        let reason = args.slice(1).join(" ");

        let muterole;
        let dbmute = await db.fetch(`muterole-${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = db.fetch(`muteeid-${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

        if (!muterole) return message.channel.send({content: "**There Is No Mute Role To Remove!**"})
        if (!mutee.roles.cache.has(muterole.id)) return message.channel.send({content: "**User is not Muted!**"})
        try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send({content: `**Hello, You Have Been Unmuted In ${message.guild.name} for ${reason || "No Reason"}**`}).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
            const sembed = new MessageEmbed()
                .setColor("#0A0301")
                .setDescription(`${mutee.user.username} was successfully unmuted.`)
            message.channel.send({embeds: [sembed]});
        

        let channel = db.fetch(`modlog-${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("#0A0301")
            .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Moderation**", "unmute")
            .addField("**Unmuted**", mutee.user.username)
            .addField("**Moderator**", message.author.username)
            .addField("**Reason**", `${reason || "**No Reason**"}`)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send({embeds: [embed]})

    }
}