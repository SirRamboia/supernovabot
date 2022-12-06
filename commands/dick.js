const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dick")
    .setDescription("Sus Dick")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Seleciona um usuário")
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("usuário");

    const responses = [
      "=",
      "==",
      "===",
      "====",
      "=====",
      "======",
      "=======",
      "========",
      "=========",
      "==========",
      "===========",
      "============",
      "=============",
      "==============",
      "===============",
    ];
    let response = responses[Math.floor(Math.random() * responses.length)];
    const pfp = user.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    let embed = new Discord.EmbedBuilder()
      .setTitle("How big is your dick?")
      .setDescription("8" + response + "D")
      .setAuthor({
        name: `Pila do ${user.username}`,
        iconURL: pfp,
      })
      .setColor(config.embedColor);

    return interaction.reply({
      embeds: [embed],
    });
  },
};
