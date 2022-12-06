const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Faz uma pergunta para a 8-ball")
    .addStringOption((option) =>
      option
        .setName("pergunta")
        .setDescription("O que é que eu devo perguntar?")
        .setRequired(true)
        .setMaxLength(1024)
    ),
  async execute(interaction) {
    const question = interaction.options.get("pergunta").value;

    let responses = [
      "Provavelmente",
      "Talvez",
      "Não sei",
      "Óbvio",
      "Sim",
      "Não",
    ];
    let response = responses[Math.floor(Math.random() * responses.length)];

    let embed = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .addFields(
        {
          name: "Questão:",
          value: question,
        },
        {
          name: "Resposta:",
          value: response,
        }
      );

    interaction.reply({
      embeds: [embed],
    });
  },
};
