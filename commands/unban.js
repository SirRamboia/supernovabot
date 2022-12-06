const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Desbane um membro")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Indique a pessoa que quer desbanir")
        .setRequired(true)
    ),

  async execute(interaction) {
    const embedPerm = new Discord.EmbedBuilder()
      .setDescription(`Não tens permissão de: \`Banir Membros\``)
      .setColor(config.embedColor);

    if (
      !interaction.member.permissions.has(
        Discord.PermissionsBitField.Flags.BanMembers
      )
    )
      return interaction.reply({
        embeds: [embedPerm],
        ephemeral: true,
      });

    const user = interaction.options.getUser("usuário");

    interaction.guild.members.unban(user);

    const embedOK = new Discord.EmbedBuilder()
      .setDescription(
        `${config.emojis.greenup} | O membro ${user} foi desbanido com sucesso!`
      )
      .setColor(config.embedColor);

    interaction.reply({
      embeds: [embedOK],
    });
  },
};
