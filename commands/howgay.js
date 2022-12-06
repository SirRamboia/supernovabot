const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("howgay")
    .setDescription("Calculadora de Gays")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Seleciona um usuário")
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("usuário");

    let embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: `O quão gay é... ${user.username}`,
        iconURL: user.displayAvatarURL()
      })
      .setDescription(`${user} é ${Math.floor(Math.random() * 101)}% gay`)
      .setColor(config.embedColor)


    interaction.reply({
      embeds: [embed],
    });
  },
};
