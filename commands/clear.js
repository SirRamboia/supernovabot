const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Apaga um determinado número de mensagens")
    .addNumberOption((option) =>
      option
        .setName("quantidade")
        .setDescription("Insira a quantidade de mensagens a apagar")
        .setRequired(true)
    ),

  async execute(interaction) {
    const embedPerm = new Discord.EmbedBuilder()
      .setDescription(`Não tens permissão de: \`Gerenciar Mensagens\``)
      .setColor(config.embedColor);
    if (
      !interaction.member.permissions.has(
        Discord.PermissionsBitField.Flags.ManageMessages
      )
    )
      return interaction.reply({
        embeds: [embedPerm],
        ephemeral: true,
      });

    const quantidade = interaction.options.getNumber("quantidade");

    const Response = new Discord.EmbedBuilder().setColor(config.embedColor);

    if (quantidade > 100 || quantidade <= 0) {
      Response.setDescription(
        `A quantidade não pode exceder 100 mensagens, nem ser menos do que 1`
      );
      return interaction.reply({
        embeds: [Response],
        ephemeral: true,
      });
    }

    await interaction.channel.bulkDelete(quantidade, true).then((messages) => {
      Response.setDescription(
        `:broom: Foram limpas \`${messages.size}\` mensagens`
      );

      interaction.reply({
        embeds: [Response],
        ephemeral: true,
      });
    });
  },
};
