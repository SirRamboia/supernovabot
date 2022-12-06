const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setticket")
    .setDescription("Configura um canal para o HUD dos tickets")
    .addChannelOption((option) =>
      option
        .setName("canal")
        .setDescription("Seleciona um canal")
        .setRequired(true)
    ),

  async execute(interaction) {
    const channel = interaction.options.getChannel("canal");

    const embedPerm = new Discord.EmbedBuilder()
      .setDescription(`Não tens permissão de: \`Administrador\``)
      .setColor(config.embedColor);
    if (
      !interaction.member.permissions.has(
        Discord.PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({
        embeds: [embedPerm],
        ephemeral: true,
      });

    let error = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(
        `${config.emojis.reddown} Tipo de canal inválido. Tente novamente num canal de texto.`
      );

    if (channel.type !== Discord.ChannelType.GuildText)
      return interaction.reply({
        embeds: [error],
        ephemeral: true,
      });

    let criar = new Discord.ButtonBuilder()
      .setCustomId("c")
      .setLabel("🎫 Abrir Ticket")
      .setStyle(Discord.ButtonStyle.Primary);

    let embedOK = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(
        `${config.emojis.greenup} O sistema de ticket foi configurado com sucesso!`
      );

    interaction.reply({
      embeds: [embedOK],
      ephemeral: true,
    });

    let row = new Discord.ActionRowBuilder().addComponents(criar);

    let embed = new Discord.EmbedBuilder()
      .setTitle("🎫 Suporte")
      .setDescription(
        `**Precisas de ajuda?**\nCarrega no botão abaixo para receberes suporte da nossa Equipa da Staff`
      )
      .setColor(config.embedColor);

    channel.send({ embeds: [embed], components: [row] });
  },
};
