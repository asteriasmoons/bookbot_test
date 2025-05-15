const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Altar = require('../models/Altar');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('altar')
		.setDescription("View a user's altar and magical items.")
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to view the altar of')
				.setRequired(false)
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user') || interaction.user;

		// All stats default to 0 or a placeholder
		const affirmations = 0;
		const tickets = 0;
		const tarot = 0;
		const grimoire = 0;
		const wand = 0;
		const potion = 0;
		const besom = 0;
		const crystals = 0;
		const cauldron = 0;
		const bio = "No description set! Use `/bio-set` to set a bio!";

		// Main altar embed
		const embed = new EmbedBuilder()
			.setAuthor({ name: `${user.username}'s Altar`, iconURL: user.
displayAvatarURL() })
			.setTitle(`**${user.username}'s Altar**`)
			.setDescription(`
**Mundane Balance**
${affirmations} | To earn affirmations use /affirm!
${tickets} | Vote for us using /vote for Magic Tickets!

**Magical Balance**
${tarot} | **Tarot**
${grimoire} | **Grimoire**
${wand} | **Wand**
${potion} | **Potion**
${besom} | **Besom**
${crystals} | **Crystals**
${cauldron} | **Cauldron**
			`)
			.setColor(0x663399)
			.setFooter({ text: `Database ID: ${user.id}` });

		// Bio embed
		const embed2 = new EmbedBuilder()
			.setTitle(`**${user.username}'s Altar Bio**`)
			.setDescription(bio)
			.setColor(0x663399)
			.setFooter({ text: `If you want to reset your bio use /bio-reset | To 
check only bio use /bio-check | To set a bio use /bio-set | Database ID: $
{user.id}` });

		await interaction.reply({ embeds: [embed, embed2] });
	}
};