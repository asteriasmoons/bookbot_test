const { MessageEmbed, Message, Client } = require('discord.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
  name: "setmuterole",
  aliases: ["setmute", "smrole", "smr"],
  description: "Sets A Mute Role For Muted Users!",
  usage: "[role name | role mention | role ID]",
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

    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({content: 
        "**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      });
    if (!args[0]) {
      let b = await db.get(`muterole-${message.guild.id}`);
      let roleName = message.guild.roles.cache.get(b);
      if (message.guild.roles.cache.has(b)) {
        return message.channel.send({content: 
          `**Muterole Set In This Server Is \`${roleName.name}\`!**`
        });
      } else
        return message.channel.send({content: 
          "**Please Enter A Role Name or ID To Set!**"
        });
    }

    let role =
      message.mentions.roles.first() ||
      client.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) ||
      message.guild.roles.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!role)
      return message.channel.send({content: "**Please Enter A Valid Role Name or ID!**"});

    try {
      let a = await db.get(`muterole-${message.guild.id}`);

      if (role.id === a) {
        return message.channel.send({content: 
          "**This Role is Already Set As Muterole!**"
        });
      } else {
        await db.set(`muterole-${message.guild.id}`, role.id);

        message.channel.send({content: 
          `**\`${role.name}\` Has Been Set Successfully As Muterole!**`
        });
      }
    } catch (e) {
      return message.channel.send({content:
        `**Error - \`Missing Permissions or Role Doesn't Exist!\`**\n\n${e.message}`
      });
    }
  }
};
