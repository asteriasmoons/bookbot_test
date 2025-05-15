const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://Nixie:Nixie333@nixie.7y0ya.mongodb.net/test");
const ms = require("parse-ms");

module.exports = {
    name: "buy", 
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { 

    let user = message.author;

    db.on("ready", () => {
      console.log(`Fetched affirm Database from - userId: ${user.id}`);
    });
  
    // top-level awaits
    await db.connect(); 

    let author = await db.fetch(`moonSoda-${user.id}`)

    if(!args[0]){

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:strdst:957112227226341386> **View \`~moonshop\` first and buy items here!** <:strdst:957112227226341386>')
      .setDescription('You can buy all items from the Moonshop with `buy <item>`!')
      .setFooter("Shops | Starcandy | Petshop | Moonshop", "https://i.postimg.cc/sDPbtgNj/onl.jpg")
      message.channel.send({ embeds: [embed] });

    } else if (args[0] === 'starcakes'){

      if (author < 50) return message.channel.send({content: `You dont have sufficient Moon Soda! Starcakes cost \`50\` Moon Soda`});

      const embed = new MessageEmbed()
        .setColor('0A0301')
        .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
        .setTitle('<:mcpbot:912818646148075540> **Starcakes Purchase!** <:mcpbot:912818646148075540>')
        .setDescription('You just bought some starcakes <:mcpbot:912818646148075540> for 50 <:msoda:955233907719143444>!')
        .setFooter('Tip! Feed your Pet Dragon Starcakes!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -50)
      await message.channel.send({ embeds: [embed] })
      await db.add(`starCakes-${user.id}`, 30);

    } else if(args[0] === 'tarot'){

      if (author < 600) return message.channel.send({content: `You dont have sufficient Moon Soda! Tarot cost \`600\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:alnt:953467518016700446> **Tarot Purchase!** <:alnt:953467518016700446>')
      .setDescription('You just bought a tarot <:alnt:953467518016700446> reading for 600 <:msoda:955233907719143444>!')
      .setFooter('Tip! Ping asterialunanyx#6666 for your reading!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -600);
      await message.channel.send({ embeds: [embed] }).then(db.add(`tarot-${user.id}`, 1));

    } else if(args[0] === 'pendulum'){

      if (author < 550) return message.channel.send({content: `You dont have sufficient Moon Soda! Pendulum cost \`550\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:pend:933046351657312348> **Pendulum Purchase!** <:pend:933046351657312348>')
      .setDescription('You just bought a pendulum <:pend:933046351657312348> reading for 550 <:msoda:955233907719143444>!')
      .setFooter('Tip! Ping asterialunanyx#6666 for your reading!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -550);
      await message.channel.send({ embeds: [embed] }).then(db.add(`pendulum-${user.id}`, 1));

    } else if(args[0] === 'grimoire'){

      if (author < 500) return message.channel.send({content: `You dont have sufficient Moon Soda! Grimoire cost \`500\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:dvntn:957112387083849758> **Grimoire Purchase** <:dvntn:957112387083849758>')
      .setDescription('You just bought a grimoire <:dvntn:957112387083849758> for 500 <:msoda:955233907719143444>')
      .setFooter('Tip! Use ~grimoire to store your work!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -500);
      await message.channel.send({ embeds: [embed] }).then(db.add(`grimoire-${user.id}`, 1));

    } else if(args[0] === 'wand'){

      if (author < 450) return message.channel.send({content: `You dont have sufficient Moon Soda! Wand cost \`450\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:wstar:882997923569340477> **Wand Purchase!** <:wstar:882997923569340477>')
      .setDescription('You just bought a wand <:wstar:882997923569340477> for 400 <:msoda:955233907719143444>!')
      .setFooter('Tip! Use ~wand to cast a circle and earn Protection Points!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -450);
      await message.channel.send({ embeds: [embed] }).then(db.add(`wand-${user.id}`, 1));

    } else if(args[0] === 'potion'){

      if (author < 400) return message.channel.send({content: `You dont have sufficient Moon Soda! Potion cost \`400\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:rbt:954966999199531028> **Potion Purchase!** <:rbt:954966999199531028>')
      .setDescription('You just bought a potion <:rbt:954966999199531028> for 350 <:msoda:955233907719143444>!')
      .setFooter('Tip! Use ~cast to use your Potions!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -400);
      await message.channel.send({ embeds: [embed] }).then(db.add(`potion-${user.id}`, 1));

    } else if(args[0] === 'besom'){

      if (author < 350) return message.channel.send({content: `You dont have sufficient Moon Soda! Besom cost \`350\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:pyf:910658359034781706> **Besom Purchase!** <:pyf:910658359034781706>')
      .setDescription('You just bought a besom <:pyf:910658359034781706> for 300 <:msoda:955233907719143444>')
      .setFooter('Tip! Use ~besom to clear your altar and earn Altar Points!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -350);
      await message.channel.send({ embeds: [embed] }).then(db.add(`besom-${user.id}`, 1));

    } else if(args[0] === 'crystalBall'){

      if (author < 300) return message.channel.send({content: `You dont have sufficient Moon Soda! Crystal Ball cost \`300\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:mgkbl:957112349439979541> **Crystal Ball Purchase!** <:mgkbl:957112349439979541>')
      .setDescription('You just bought a crystal ball <:mgkbl:957112349439979541> for 250 <:msoda:955233907719143444>')
      .setFooter('Tip! Use ~cball to scry and get visual messages!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -300);
      message.channel.send({ embeds: [embed] }).then(db.add(`crystalBall-${user.id}`, 1));

    } else if(args[0] === 'crystals'){

      if (author < 250) return message.channel.send({content: `You dont have sufficient Moon Soda! Crystals cost \`250\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:crsp:957534726627922041> **Crystals Purchase!** <:crsp:957534726627922041>')
      .setDescription('You just bought some crystals <:crsp:957534726627922041> for 200 <:msoda:955233907719143444>!')
      .setFooter('Tip! Use ~harvest to get more crystals!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -250);
      await message.channel.send({ embeds: [embed] }).then(db.add(`crystals-${user.id}`, 4));

    } else if(args[0] === 'cauldron'){

      if (author < 200) return message.channel.send({content: `You dont have sufficient Moon Soda! Cauldron cost \`200\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:cgcd:957877549814382592> **Cauldron Purchase!** <:cgcd:957877549814382592>')
      .setDescription('You just bought a cauldron <:cgcd:957877549814382592> for 150 <:msoda:955233907719143444>!')
      .setFooter('Tip! Use ~cauldron to make a simmer pot!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -200);
      message.channel.send({ embeds: [embed] }).then(db.add(`cauldron-${user.id}`, 1));

    } else if(args[0] === 'crescentJuice'){

      if (author < 150) return message.channel.send({content: `You dont have sufficient Moon Soda! Cresent Juice cost \`150\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:cstjc:959518995692781638> **Crescent Juice Purchase!** <:cstjc:959518995692781638>')
      .setDescription('You just bought some crescent juice <:cstjc:959518995692781638> for 400 <:msoda:955233907719143444>!')
      .setFooter('Tip! Use ~cjuice to give it to your Pet Dragon!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -150)
      await message.channel.send({ embeds: [embed] }).then(db.add(`crescentJuice-${user.id}`, 4));

    } else if(args[0] === 'mooncakes'){ 

      if (author < 150) return message.channel.send({content: `You dont have sufficient Moon Soda! Moon Cakes cost \`150\` Moon Soda`});

      const embed = new MessageEmbed()
      .setColor('0A0301')
      .setThumbnail('https://i.postimg.cc/C1tcfWr6/tlws.jpg')
      .setTitle('<:mcpbot:912818646148075540> **Mooncakes Purchase!** <:mcpbot:912818646148075540>')
      .setDescription('You just bought some mooncakes <:mcpbot:912818646148075540> for 100 <:msoda:955233907719143444>!')
      .setFooter('Tip! Use ~nourish to feed your Pet Dragon!', 'https://i.postimg.cc/sDPbtgNj/onl.jpg')
      await db.add(`moonSoda-${user.id}`, -150)
      await message.channel.send({ embeds: [embed] }).then(db.add(`moonCakes-${user.id}`, 10));
    }
  }
}
