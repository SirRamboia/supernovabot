const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anónimo")
    .setDescription("Mensagem anónima")
    .addStringOption((option) =>
      option
        .setName("mensagem")
        .setDescription("Introduz uma mensagem")
        .setRequired(true)
    ),

  async execute(interaction) {
    const string = interaction.options.getString("mensagem");

    const embed = new Discord.EmbedBuilder()
     
      .setAuthor({
        name: "Mensagem anónima",
        iconURL: "https://media.giphy.com/media/kglwHpy9SexXV8X48W/giphy.gif"
      })
      .setDescription(`${string}`)
      .setColor("2f3136")
      .setTimestamp();

    const embedOK = new Discord.EmbedBuilder()
      .setDescription(`Mensagem anónima enviada com sucesso`)
      .setColor(config.embedColor);

    interaction.channel.send({
      embeds: [embed],
    });

    interaction.reply({
      embeds: [embedOK],
      ephemeral: true,
    });
  },
};
