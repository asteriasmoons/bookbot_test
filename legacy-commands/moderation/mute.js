const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "mute",
    description: "Mutes a member in the discord!",
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
            if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "**You Dont Have Permmissions To Mute Someone! - [MANAGE_GUILD]**"});

            if (!message.guild.me.permissions.has("MANAGE_GUILD")) return message.channel.send({content: "**I Don't Have Permissions To Mute Someone! - [MANAGE_GUILD]**"})
            if (!args[0]) return message.channel.send({content: "**Please Enter A User To Be Muted!**"});

            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee) return message.channel.send({content: "**Please Enter A Valid User To Be Muted!**"});

            if (mutee === message.member) return message.channel.send({content: "**You Cannot Mute Yourself!**"})
            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send({content: '**Cannot Mute This User!**'})

            let reason = args.slice(1).join(" ");
            if (mutee.user.bot) return message.channel.send({content: "**Cannot Mute Bots!**"});
            const userRoles = mutee.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r.id)

            let muterole;
            let dbmute = await db.fetch(`muterole-${message.guild.id}`);
            let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

            if (!message.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = message.guild.roles.cache.get(dbmute)
            }

            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: "muted",
                            color: "#0A0301",
                            permissions: []
                        }
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
            };

            if (mutee.roles.cache.has(muterole.id)) return message.channel.send({content: "**User Is Already Muted!**"})

            await db.set(`muteeid-${message.guild.id}-${mutee.id}`, userRoles)
          try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send({content: `**Hello, You Have Been Muted In ${message.guild.name} for - ${reason || "No Reason"}`}).catch(() => null)
            })
            } catch {
                 mutee.roles.set([muterole.id])                               
            }
                if (reason) {
                const sembed = new MessageEmbed()
                    .setColor("#0A0301")
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`${mutee.user.username} was successfully muted for ${reason}`)
                message.channel.send({embeds: [sembed]});
                } else {
                    const sembed2 = new MessageEmbed()
                    .setColor("#0A0301")
                    .setDescription(`${mutee.user.username} was successfully muted`)
                message.channel.send({embeds: [sembed2]});
                }
            
            let channel = await db.fetch(`modlog-${message.guild.id}`)
            if (!channel) return;

            let embed = new MessageEmbed()
                .setColor('#0A0301')
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .addField("**Moderation**", "mute")
                .addField("**Mutee**", mutee.user.username)
                .addField("**Moderator**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [embed]})
        } catch {
            return;
        }
    }
}