const { Client, MessageEmbed, Message, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require("node-fetch");
const { embedColor } =  require('../../config.js');
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");
const { stripIndents } = require("common-tags");


module.exports = {
    name: "help",
    description: "Help Menu",
    usage: `1) ~help \n2) ~help [module name]\n3) -~help [command (name or alias)]`,
    example: `1) ~}help\n2) ~help utility\n3) ~help 8ball`,
    aliases: ['h'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
run: async (client, message, args) => {

    let user = message.author;

        db.on("ready", () => {
            console.log(`Fetched economyCommands Database from - userId: ${user.id}`);
          });
        
          // top-level awaits
          await db.connect(); 
      
        const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Invite Nixie')
                    .setStyle('LINK')
                    .setURL('https://discord.com/oauth2/authorize?client_id=946250414196662282&permissions=8&scope=applications.commands%20bot')
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
  
        if(!args[0]){
    const help = new MessageEmbed()
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
    .setDescription(`<:rsp:961696233716592661> **Help Menu: [all]** <:rsp:961696233716592661>\n✧₊꒷꒦︶︶︶☽☾︶︶︶꒦꒷₊✦`)
    .setColor(embedColor) // Set the color
    .addField(`<:dvntn:957112387083849758> **Divination** <:dvntn:957112387083849758>`, `<:rpsh:955321723434205225> Use ~divination-commands to see our divination commands and their usage! <:rpsh:955321723434205225>`)
    .addField(`<:cgcd:957877549814382592> ** Cauldron** <:cgcd:957877549814382592>`, `<:gpsh:956246336318095370> **Help Command Coming Soon!!** <:gpsh:956246336318095370>`)
    .addField(`<:mgkbl:957112349439979541> **Occult** <:mgkbl:957112349439979541>`, `<:tpsh:955321772058763305> Use ~occult-commands to see our Occult commands list and the commands usage! <:tpsh:955321772058763305>`)
    .addField(`<:hrbk:957747877910818846> **Information** <:hrbk:957747877910818846>`, `<:gpsh:956246336318095370> Use ~info-commands to see all information commands and their usage! <:gpsh:956246336318095370>`)
    .addField(`<:strdst:957112227226341386> **Utility** <:strdst:957112227226341386>`, `<:upsh:955695038191501332> Use ~utility-commands to see all of our utility commands and their usage! <:upsh:955695038191501332>`)
    .addField(`<:msoda:955233907719143444> **Economy** <:msoda:955233907719143444>`, `<:rpsh:955321723434205225> Use ~economy-commands to see all of our economy commands and their usage! <:rpsh:955321723434205225>`)
    .addField(`<:ban:924505758589128795> **Moderation** <:ban:924505758589128795>`, `<:npsh:958381321367998495> Use ~mod-commands to see all of our moderation commands and their usage! <:npsh:958381321367998495>`)
    .addField(`<:nixm:959126078222372914> **Altar** <:nixm:959126078222372914>`, `<:tpsh:955321772058763305> Use ~altar-commands to see all available commands for your altar and their usage! <:tpsh:955321772058763305>`)
    return message.channel.send({embeds: [help], components: [row]});
}

else {
    const embed = new MessageEmbed()
    .setColor(embedColor)
    .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
    .setThumbnail(client.user.displayAvatarURL())

    let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
    if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`-help\` For the List Of the Commands!**`))
    command = command.config

    embed.setDescription(stripIndents`
    ** Command -** [    \`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\`   ]\n
    ** Description -** [    \`${command.description || "No Description provided."}\`   ]\n
    ** Usage -** [   \`${command.usage ? `\`${command.usage}\`` : "No Usage"}\`   ]\n
    ** Examples -** [   \`${command.example ? `\`${command.example}\`` : "No Examples Found"}\`   ]\n
    ** Aliases -** [   \`${command.aliases ? command.aliases.join(" , ") : "None."}\`   ]`)
    embed.setFooter(message.guild.name, message.guild.iconURL())

    return message.channel.send({embeds: [embed]})
}

    

}

}
