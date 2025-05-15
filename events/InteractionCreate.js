const { 
  ModalBuilder, 
  TextInputBuilder, 
  TextInputStyle, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');

module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return interaction.reply({
        content: "Unknown command.",
        ephemeral: true,
      });
    }
    try {
      await command.execute(interaction, client);
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "There was an error executing this command.",
        ephemeral: true,
      });
    }
  }

  // Buttons
  else if (interaction.isButton()) {
    // Example: handle buttons by customId
    if (interaction.customId === "EXAMPLE_BUTTON") {
      return interaction.reply({ content: "You clicked the example button!" });
    }
    // Add more button handlers here as needed
  }

  // Modals
  else if (interaction.isModalSubmit()) {
    if (interaction.customId === "EXAMPLE_MODAL") {
      return interaction.reply({ content: "Modal submitted!" });
    }
    // Add more modal handlers here as needed
  }
    };