const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sugerir")
    .setDescription("Dá uma sugestão")
    .addStringOption((option) =>
      option
        .setName("sugestão")
        .setDescription("Escreve uma sugestão")
        .setRequired(true)
    ),

  async execute(interaction) {
    const suggestionQuery = interaction.options.getString("sugestão");

    const embed = new Discord.EmbedBuilder()
      .setDescription(`${suggestionQuery}`)
      .setColor("ffc300")
      .setTimestamp()
      .addFields(
        {
          name: "Sugestão enviada por:",
          value: `${interaction.user}`,
        },
        {
          name: "Status:",
          value: "Em análise",
        }
      );

    const embedOK = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription("Sugestão enviada! Obrigado por contribuires!");

    interaction.reply({
      embeds: [embedOK],
      ephemeral: true,
      fetchReply: true,
    });

    interaction.client.channels.cache
      .get(config.channels.sugestoes)
      .send({
        embeds: [embed],
      })
      .then((message) => {
        message.react(config.emojis.greenup);
        message.react(config.emojis.reddown);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
