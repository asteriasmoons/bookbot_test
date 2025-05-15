const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Altar = require('../models/Altar');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bio')
        .setDescription('Set, check, or reset your biography')
        .addSubcommand(sub =>
            sub
                .setName('set')
                .setDescription('Set your bio')
                .addStringOption(opt =>
                    opt.setName('text')
                        .setDescription('Your bio text')
                        .setRequired(true)
                )
                .addStringOption(opt =>
                    opt.setName('image')
                        .setDescription('Image URL for your bio')
                        .setRequired(false)
                )
        )
        .addSubcommand(sub =>
            sub
                .setName('check')
                .setDescription('Check someone\'s bio')
                .addUserOption(opt =>
                    opt.setName('user')
                        .setDescription('User to check')
                        .setRequired(false)
                )
        )
        .addSubcommand(sub =>
            sub
                .setName('reset')
                .setDescription('Reset your bio (remove it)')
        ),

    async execute(interaction) {
        const sub = interaction.options.getSubcommand();

        if (sub === 'set') {
            const bio = interaction.options.getString('text');
            const image = interaction.options.getString('image');

            if (bio.length > 650) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Error')
                            .setDescription('Your bio is too long. Maximum 650 characters.')
                            .setColor(0x663399)
                    ],
                    ephemeral: false
                });
            }

            // Upsert the user's Altar document with new bio and image
            await Altar.findOneAndUpdate(
                { userId: interaction.user.id },
                { bio: bio, bioImage: image },
                { upsert: true, new: true }
            );

            const embed = new EmbedBuilder()
                .setTitle('Bio Set!')
                .setDescription(bio)
                .setColor(0x663399);

            if (image) {
                embed.setImage(image);
            }

            return interaction.reply({ embeds: [embed], ephemeral: false });
        }

        if (sub === 'check') {
            const user = interaction.options.getUser('user') || interaction.user;
            const altar = await Altar.findOne({ userId: user.id });

            if (!altar || !altar.bio) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('No Bio')
                            .setDescription(`No bio found for ${user.username}.`)
                            .setColor(0x663399)
                    ],
                    ephemeral: false
                });
            }

            const embed = new EmbedBuilder()
                .setTitle(`${user.username}'s Bio`)
                .setDescription(altar.bio)
                .setColor(0x663399);

            if (altar.bioImage) {
                embed.setImage(altar.bioImage);
            }

            return interaction.reply({ embeds: [embed], ephemeral: false });
        }

        if (sub === 'reset') {
            // Remove the bio and bioImage fields for the user
            const altar = await Altar.findOne({ userId: interaction.user.id });

            if (!altar || (!altar.bio && !altar.bioImage)) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('Nothing to Reset')
                            .setDescription('You don\'t have a bio to reset.')
                            .setColor(0x663399)
                    ],
                    ephemeral: false
                });
            }

            altar.bio = undefined;
            altar.bioImage = undefined;
            await altar.save();

            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Bio Reset')
                        .setDescription('Your bio has been reset.')
                        .setColor(0x663399)
                ],
                ephemeral: false
            });
        }
    }
};