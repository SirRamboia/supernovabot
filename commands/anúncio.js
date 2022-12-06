const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anúncio")
    .setDescription("Emite um anúncio, num determinado canal")
    .addStringOption((option) =>
      option
        .setName("texto")
        .setDescription("Insere um texto")
        .setRequired(true)
        .setMaxLength(1024)
    )
    .addChannelOption((option) =>
      option
        .setName("canal")
        .setDescription("Seleciona um canal")
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

    const texto = interaction.options.get("texto").value;
    const canal = interaction.options.getChannel("canal");

    let embed = new Discord.EmbedBuilder()
      .setTitle(`Anúncio`)
      .setDescription(texto)
      .setColor(config.embedColor)

    let error = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(
        `${config.emojis.reddown} Este canal não pode receber anúncios. Envie num canal de texto.`
      );

    if (
      canal.type !== Discord.ChannelType.GuildText &&
      canal.type !== Discord.ChannelType.GuildAnnouncement
    )
      return interaction.reply({
        embeds: [error],
        ephemeral: true,
      });

    canal.send({
      embeds: [embed],
    });

    let ok = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(`${config.emojis.greenup} Aviso enviado com sucesso.`);

    return interaction.reply({
      embeds: [ok],
      ephemeral: true,
    });
  },
};
