const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Dá uma chapada")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Seleciona um usuário para dar uma chapada")
        .setRequired(true)
    ),

  async execute(interaction) {
    const user1 = interaction.options.getUser("usuário");

    if (user1.id === interaction.user.id) {
      let stopembed = new Discord.EmbedBuilder()
        .setDescription("Não podes dar uma chapada a ti mesmo.")
        .setColor(config.embedColorRed)

      return interaction.reply({
        embeds: [stopembed],
      });
    }

    let { body } = await superagent.get(`https://nekos.life//api/v2/img/slap`);

    let embed = new Discord.EmbedBuilder()
      .setDescription(`**${interaction.user}** deu uma chapada a **${user1}**`)
      .setImage(body.url)
      .setColor(config.embedColor);

    interaction.reply({
      embeds: [embed],
    });
  },
};
