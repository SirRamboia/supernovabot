const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Desbloqueia um canal")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Seleciona o canal")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const canal = interaction.options.getChannel("channel");

    const embed1 = new Discord.EmbedBuilder()
      .setDescription(`Não tens permissão de: \`Gerenciar Cargos\``)
      .setColor(config.embedColor);

    const embed2 = new Discord.EmbedBuilder()
      .setDescription(`Eu não tenho permissão de: \`Gerenciar Cargos\``)
      .setColor(config.embedColor);

    if (
      !interaction.member.permissions.has(
        Discord.PermissionsBitField.Flags.ManageRoles
      )
    ) {
      return interaction.reply({
        embeds: [embed1],
        ephemeral: true,
      });
    }

    if (
      !interaction.guild.members.me.permissions.has(
        Discord.PermissionsBitField.Flags.ManageRoles
      )
    ) {
      return interaction.reply({
        embeds: [embed2],
        ephemeral: true,
      });
    }

    const error = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(
        `${config.emojis.reddown} Só podes desbloquear canais de texto`
      );

    if (canal.type !== Discord.ChannelType.GuildText) {
      return interaction.reply({
        embeds: [error],
        ephemeral: true,
      });
    }

    await canal.permissionOverwrites.edit(interaction.guild.id, {
      SendMessages: true,
    });

    const embed = new Discord.EmbedBuilder()
      .setDescription(`🔓 **|** ${canal} foi desbloqueado`)
      .setColor(config.embedColor);

    interaction.reply({
      embeds: [embed],
    });
  },
};
