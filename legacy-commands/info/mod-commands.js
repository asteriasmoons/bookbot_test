const { Client, MessageEmbed, Message, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require("node-fetch");
const { embedColor } =  require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");


module.exports = {
    name: "mod-commands",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
run: async (client, message, args) => { 
    
        let user = message.author;

        db.on("ready", () => {
            console.log(`Fetched modCommands Database from - userId: ${user.id}`);
          });
        
          // top-level awaits
          await db.connect(); 
      
        const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Invite Nixie')
                    .setStyle('LINK')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=946250414196662282&permissions=8&scope=bot')
                     .setEmoji('<:nix:959126006990508072>'),
                )
                   .addComponents(
                     new MessageButton()
                     .setLabel('Nixie Support Server')
                     .setStyle('LINK')
                     .setURL('https://discord.gg/nixiesether')
                      .setEmoji('<:nixm:959126078222372914>'),
                )
                       .addComponents(
                         new MessageButton()
                         .setLabel('Nixies Ko-fi Shop')
                         .setStyle('LINK')
                         .setURL('https://ko-fi.com/S6S7BU1QB')
                          .setEmoji('<:kckb:959317032711634964>'),
                );
        
         const embed = new MessageEmbed()
        .setColor('0A0301')
        .setThumbnail('https://i.postimg.cc/qB2dWKKg/mod.jpg')
        .setTitle('<:ban:924505758589128795> **Moderation Commands** <:ban:924505758589128795>')
        .setDescription('These are all of the moderation commands we have for now!')
        .addField('<:npsh:958381321367998495> Mute <:npsh:958381321367998495>', 'Use ~mute <mention/username/ID>, <reason> (optional) to mute someone being inappropriate in your server and/or breaking rules!')
        .addField('<:npsh:958381321367998495> Set Mute Role <:npsh:958381321367998495>', 'Use ~setmute <role name/mention/ID>! This is to setup a role to give to those who you need to put in a time out!')
        .addField('<:npsh:958381321367998495> Warn <:npsh:958381321367998495>', 'Use ~warn <mention/username/ID>, <reaosn> (optional) to warn someone when they are teetering on the line of being muted/kicked/banned!')
        .addField('<:npsh:958381321367998495> Unmute <:npsh:958381321367998495>', 'Use ~unmute <username/mention/ID>, <reason> (optional). This allows you to take your muted member off of the time out role.')
        .addField('<:npsh:958381321367998495> Ban <:npsh:958381321367998495>', 'Use ~ban <username/mention/ID>, <reason> (optional). This command allows you to throw someone out of your server who can not behave and prevents them from coming back.')
        .addField('<:npsh:958381321367998495> Unban <:npsh:958381321367998495>', 'Use ~unban <name/nickname/mention/ID>, <reason> (optional). When you decide you have forgiven someone you have banned then you can use this command to let them back into your server if they so choose.')
        .addField('<:npsh:958381321367998495> Set Nickname <:npsh:958381321367998495>', 'Use ~setnick <nickname> to change the name of a user if you have decided it is not appopriate/within guideline of your server/discord tos.')
        .addField('<:npsh:958381321367998495> Set Mod Logs Channel <:npsh:958381321367998495>', 'Use ~setmodlog <channel name/mention/ID> to setup a channel for Nixie bot to send moderation logs!')
        .addField('<:npsh:958381321367998495> Purge <:npsh:958381321367998495>', 'Use ~m/purge <amount of messages> to clear a channel of its messages so you do not have to clone/create a new channel.')
        .addField('<:npsh:958381321367998495> Kick <:npsh:958381321367998495>', 'Use ~kick <username/mention/nickname/ID> to give someone whos time is up in your server the boot!')
        .addField('<:npsh:958381321367998495> Hackban|Forceban <:npsh:958381321367998495>', 'Use ~hack/forceban <user ID> <reason> (optional) to forceban someone from your server. This command also comes in handy for someone who is NOT currently in your server.')
        .addField('<:npsh:958381321367998495> Disable Mute Role <:npsh:958381321367998495>', 'Use ~dmrole <role name/mention/ID> to disable the set mute role in your server.')
        .addField('<:npsh:958381321367998495> Disable Mod Log Channel <:npsh:958381321367998495>', 'Use ~disablemodlog <channel name/mention/ID> to disable the set mod log channel.')
         return message.channel.send({embeds: [embed], components: [row]});
     }
}
