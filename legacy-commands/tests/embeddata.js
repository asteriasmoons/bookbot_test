const { Message, Client, MessageEmbed, MessageAttachment } = require("discord.js");
const config = require("../../config.js")
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");

module.exports = {
    name: "embeddata",
    aliases: [],
    usage: "~embed <EMBEDNAME> ++ <TITLE> ++ <DESCRIPTION> ++ <THUMBNAILURL> ++ <IMAGEURL>\nYou must include ++ to seperate",
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
            message.channel.send({content: `usage: \`~embed <EMBEDNAME> ++ <TITLE> ++ <DESCRIPTION> ++ <THUMBNAILURL> ++ <IMAGEURL>\nYou must include ++ to seperate each thing!\``})
        }
        let name = userargs[0]
        let title = userargs[1];
        let desc = userargs[2]
        let thumb = userargs[3];
        let img = userargs[4];

        let sendembed = new MessageEmbed()
        .setColor("0A0301")
        .setFooter(`Embed name: ${name} | Embed Created by Nixie! | Only Premium users can add large images to embeds!`)
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


        let data = sendembed
        await db.set(`serverEmbeds-${message.guild.id}`, `${data}`)

        let emblist = await db.get(`serverEmbeds-${message.guild.id}`)

      message.channel.send({embeds: [sendembed]}).then(     
               
        message.channel.send({content: `Here is a list of all your embeds:\n\n${emblist}\nUse ~embed <embedname> to sent that embed | Use ~editembed <embedname> to edit`})
      ).catch(e=>{
        return message.reply({content : `${e}`, code: "js"});
      })
    }
}
