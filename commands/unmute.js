const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Retira o mute de um membro")
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Seleciona um membro")
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

    const user = interaction.options.getUser("membro");
    const user1 = interaction.options.getMember("membro");

    let muterole = interaction.guild.roles.cache.find(
      (x) => x.id === config.roles.mute
    );

    user1.roles.remove(muterole.id);

    const mute = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(`${config.emojis.greenup} ${user} foi desmutado`)
      .setTimestamp()

    await interaction.reply({
      embeds: [mute],
    });
  },
};
