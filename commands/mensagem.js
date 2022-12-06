const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mensagem")
    .setDescription("Faz o bot dizer uma frase")
    .addStringOption((option) =>
      option
        .setName("texto")
        .setDescription("Introduz um texto")
        .setRequired(true)
        .setMaxLength(1024)
    ),

  async execute(interaction) {
    const string = interaction.options.getString("texto");

    const embed = new Discord.EmbedBuilder()
      .setDescription(`${string}`)
      .setFooter({ text: `Submetido por por ${interaction.user.tag}` })
      .setColor(config.embedColor);
    interaction.reply({
      embeds: [embed],
    });
  },
};
