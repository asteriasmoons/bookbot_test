const { MessageEmbed, MessageAttachment, Message, Client } =  require("discord.js");
//MessageEmbed lets us build embeds
//MessageAttachment lets us add image attachments
//Message gets the message and where the command to place so it can send reply in same place
//Client it the bot, Client is a global function that controls the bot basicaly
const { embedColor } = require('../../config.js');
//embecColor is a var that contains the hex color and it requires config.json because thats where the string is


// module.exports is the command handler, the base of a command structure
module.exports = {
    name: "btarot",
    aliases: ['bt'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => { //run makes the command well run lol
    try { //try till try to do this
        let BurntWonderlandTarot = require('../../scripts/tarot/burntwonderland.json'); //the tarot script

        let SetDeck = [ BurntWonderlandTarot]; // sets the deck

        let outcome = SetDeck[Math.floor(Math.random() * SetDeck.length)] // the outcome is set to random // this part isnt really nessicary
        let CardOutcome = outcome.cards[Math.floor(Math.random() * outcome.cards.length)]; // card outcome randomly choses a card from the deck

        let img = new MessageAttachment(`${CardOutcome.img}`, 'image.jpg'); //sets the image with MessageAttachment 

        //below is the embed
        const embed = new MessageEmbed()
        .setTitle(`<a:tarbot:949248356922834974> | ${CardOutcome.number} |  ${CardOutcome.name} | <a:tarbot:949248356922834974>`)
        .addField("Card Meaning:", `${CardOutcome.description}`)
        .setImage(`attachment://image.jpg`)
        .setFooter(`Deck: ${outcome.deck} | Arcana: ${CardOutcome.arcana} | Suit: ${CardOutcome.suit}`)
        .setColor(embedColor)


        ///GENERAL...///
        if (!args.length) return message.reply({embeds: [embed], files: [img]}); //if there is nothing after the command (-tarot) it will just send this
        if (args[0] === 'help'){ //if help is types after -tarot so like -tarot help, it will send help command

            const help = new MessageEmbed()
            .setTitle(`Tarot command help`)
            .setDescription(`**Warning:**\nWhen using a command that shows a \`-\` before a word you must include the \`-\` before the word. ex: \`c!t -text\` If you do not incude the \`-\` it will not work!\n\n
            **General**
            \`-t\` sends a random tarot
            \`-t text\` sends a random tarot in text form
            \`-t 3\` sends three card spread from random decks
            \`-t 3 text\` sends three card spread from random decks in text form
            
            **Other**
            \`-t help\` sends this help embed!`)
            .setFooter(`Need more help? use -invite to a link to our support server!`)
            .setColor(embedColor)

            message.reply({embeds: [help]});
        }
        ///Burnt Wonderland Tarot///
        if (args[0] === 'text') { //if the command is -tarot text, it will send in text form

            let SetDeck = [ BurntWonderlandTarot];

            let SetOutcome = SetDeck[Math.floor(Math.random() * SetDeck.length)]
            let SetCardOutcome = SetOutcome.cards[Math.floor(Math.random() * SetOutcome.cards.length)];

            let SetImg = new MessageAttachment(`${SetCardOutcome.img}`, 'image.jpg');


            return message.reply({content: `**<a:tarbot:949248356922834974> ${SetCardOutcome.name} <a:tarbot:949248356922834974>**\n**Arcana:** ${SetCardOutcome.arcana}\n**Number:** ${SetCardOutcome.number}\n**Suit:** ${SetCardOutcome.suit}\n**Deck:** ${SetOutcome.deck}\n**Meaning:** ${SetCardOutcome.description}\n\`Sources: https://www.tarot.com/ & https://labyrinthos.co/\``, files: [SetImg]});
        };
        if (args[0] === '3' && !args[1]) { // if command is -tarot 3 and has no other argument  it will send 3 cards

            let SetDeck = [ BurntWonderlandTarot];

            let SetOutcome = SetDeck[Math.floor(Math.random() * SetDeck.length)]
            let SetCardOutcome = SetOutcome.cards[Math.floor(Math.random() * SetOutcome.cards.length)];

            let SetImg = new MessageAttachment(`${SetCardOutcome.img}`, 'image.jpg');


            let OneEmbed = new MessageEmbed()
            .setTitle(`<a:tarbot:949248356922834974> ${SetCardOutcome.name} <a:tarbot:949248356922834974>`)
            .setDescription(`Arcana: ${SetCardOutcome.arcana}\nNumber: ${SetCardOutcome.number}\nSuit: ${SetCardOutcome.suit}`)
            .addField("Meaning:", `${SetCardOutcome.description}`)
            .setImage(`attachment://image.jpg`)
            .setFooter(`Deck: ${SetOutcome.deck}`)
            .setColor(embedColor)


            let SetCardOutcomeTwo = SetOutcome.cards[Math.floor(Math.random() * SetOutcome.cards.length)];
            let SetImgTwo = new MessageAttachment(`${SetCardOutcomeTwo.img}`, 'imagetwo.jpg');

            let TwoEmbed = new MessageEmbed()
            .setTitle(`<a:tarbot:949248356922834974> ${SetCardOutcome.name} <a:tarbot:949248356922834974>`)
            .setDescription(`Arcana: ${SetCardOutcomeTwo.arcana}\nNumber: ${SetCardOutcomeTwo.number}\nSuit: ${SetCardOutcomeTwo.suit}`)
            .addField("Meaning:", `${SetCardOutcomeTwo.description}`)
            .setImage(`attachment://imagetwo.jpg`)
            .setFooter(`Deck: ${SetCardOutcomeTwo.deck}`)
            .setColor(embedColor)


            let SetCardOutcomeThree = SetOutcome.cards[Math.floor(Math.random() * SetOutcome.cards.length)];
            let SetImgThree = new MessageAttachment(`${SetCardOutcomeThree.img}`, 'imagethree.jpg');

            let ThreeEmbed = new MessageEmbed()
            .setTitle(`<a:tarbot:949248356922834974> ${SetCardOutcomeThree.name} <a:tarbot:949248356922834974>`)
            .setDescription(`Arcana: ${SetCardOutcomeThree.arcana}\nNumber: ${SetCardOutcomeThree.number}\nSuit: ${SetCardOutcomeThree.suit}`)
            .addField("Meaning:", `${SetCardOutcomeThree.description}`)
            .setImage(`attachment://imagethree.jpg`)
            .setFooter(`Deck: ${SetCardOutcomeThree.deck}`)
            .setColor(embedColor)

            message.reply({embeds: [OneEmbed,TwoEmbed,ThreeEmbed], files: [SetImg,SetImgTwo,SetImgThree]});
        }
        if (args[0] === '3' && args[1] === 'text') { //if the command is -tarot 3 text it will send 3 text only tarots

            let SetDeck = [ BurntWonderlandTarot];

            let SetOutcome = SetDeck[Math.floor(Math.random() * SetDeck.length)]
            let SetCardOutcome = SetOutcome.cards[Math.floor(Math.random() * SetOutcome.cards.length)];

            let SetImg = new MessageAttachment(`${SetCardOutcome.img}`, 'image.jpg');


            let SetCardOutcomeTwo = SetOutcome.cards[Math.floor(Math.random() * SetOutcome.cards.length)];
            let SetImgTwo = new MessageAttachment(`${SetCardOutcomeTwo.img}`, 'imagetwo.jpg');
            

            let SetCardOutcomeThree = SetOutcome.cards[Math.floor(Math.random() * SetOutcome.cards.length)];
            let SetImgThree = new MessageAttachment(`${SetCardOutcomeThree.img}`, 'imagethree.jpg');


            message.channel.send({content: `**<a:tarbot:949248356922834974> ${CardOutcome.name} <a:tarbot:949248356922834974>**\n**Arcana:** ${CardOutcome.arcana}\n**Number:** ${CardOutcome.number}\n**Suit:** ${CardOutcome.suit}\n**Deck:** ${CardOutcome.deck}\n**Meaning:** ${CardOutcome.description}\n\`Sources: https://www.tarot.com/ & https://labyrinthos.co/\``, files: [SetImg]});
            message.channel.send({content: `**<a:tarbot:949248356922834974> ${SetCardOutcomeTwo.name} <a:tarbot:949248356922834974>**\n**Arcana:** ${SetCardOutcomeTwo.arcana}\n**Number:** ${SetCardOutcomeTwo.number}\n**Suit:** ${SetCardOutcomeTwo.suit}\n**Deck:** ${SetCardOutcomeTwo.deck}\n**Meaning:** ${SetCardOutcomeTwo.description}\n\`Sources: https://www.tarot.com/ & https://labyrinthos.co/\``, files: [SetImgTwo]});
            message.channel.send({content: `**<a:tarbot:949248356922834974> ${SetCardOutcomeThree.name} <a:tarbot:949248356922834974>**\n**Arcana:** ${SetCardOutcomeThree.arcana}\n**Number:** ${SetCardOutcomeThree.number}\n**Suit:** ${SetCardOutcomeThree.suit}\n**Deck:** ${SetCardOutcomeThree.deck}\n**Meaning:** ${SetCardOutcomeThree.description}\n\`Sources: https://www.tarot.com/ & https://labyrinthos.co/\``, files: [SetImgThree]});

        };

        return;
    } catch (e) { //if it fails try it will send an error
        message.reply({content: 'Nixie fell asleep and an error occurred! \`Could not obtain a tarot!\`\nPlease report this to the devs using \`-report <command error occured at>\` | Please make sure to state the command used that caused the error!'})
        //sends error to user 
        return console.error(e); //logs the error
    }
    }
}
//ends everything :3
