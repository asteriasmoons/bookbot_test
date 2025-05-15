const { Message, Client, MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../../config.js")
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");

module.exports = {
    name: "embed",
    aliases: ['embeded', 'e'],
    usage: "~embed <TITLE> ++ <DESCRIPTION> ++ <THUMBNAILURL> ++ <IMAGEURL>\nYou must include ++ to seperate",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

      db.on("ready", () => {
        console.log(`Fetched embed from - userId: ${message.author.id}`);
          });
    
      await db.connect();
      let user = await db.get(`premium.users`);
      let premiumUser = [message.author === user];

        let userargs = args.join(" ").split("++");
        if(!userargs){
            message.channel.send({content: `usage: \`~embed <TITLE> ++ <DESCRIPTION> ++ <THUMBNAILURL> ++ <IMAGEURL>\nYou must include ++ to seperate each thing!\``})
        }
        let title = userargs[0];
        let desc = userargs[1]
        let thumb = userargs[2];
        let img = userargs[3];

        let sendembed = new MessageEmbed()
        .setColor("0A0301")
        .setFooter("Embed Created by Nixie! | Only Premium users can add large images to embeds!")
        if(desc){
            sendembed.setDescription(desc)
        }
        if(title){
            sendembed.setTitle(title)
        }
        if(premiumUser && img){
          sendembed.setImage(img)
        }
        if(!premiumUser && img){
            message.channel.send({content: `You must be a premium user to add an image to embeds!`})
        }
        if(thumb){
            sendembed.setThumbnail(thumb)
        }

      message.channel.send({embeds: [sendembed]}).then(d=>{
        var ee = "Here is your Command, if you wanna use it again!";
        if(message.content.length > 2000){
          ee = "Here is your Command"
        }
        if(message.content.length > 2020){
          ee = ""
        }
      }).catch(e=>{
        return message.reply({content : `${e}`, code: "js"});
      })
    }
}
