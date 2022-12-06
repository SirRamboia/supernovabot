const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dados")
    .setDescription("Lança os dados"),

  async execute(interaction) {
    var responses = [1, 2, 3, 4, 5, 6];
    let response = responses[Math.floor(Math.random() * responses.length)];

    const embed = new Discord.EmbedBuilder()
      .setTitle("Jogo dos Dados")
      .setColor(config.embedColor)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/586986302885462028/745706934853959680/Gifs_animados_Dado_8.gif"
      )
      .setDescription(`Lançaste os dados, e caiu: ${response}`);

    return interaction.reply({
      embeds: [embed],
    });
  },
};
