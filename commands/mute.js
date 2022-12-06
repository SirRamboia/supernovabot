const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");
const ms = require("ms");
const { duration } = require("moment/moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Dá mute a um membro")
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Seleciona um membro")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duração")
        .setDescription("Insere uma duração")
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

    const Member = interaction.options.getUser("membro");
    const Member1 = interaction.options.getMember("membro");
    const time = interaction.options.getString("duração");

    const role = interaction.guild.roles.cache.find(
      (role) => role.id === config.roles.mute
    );

    let embedOK = new Discord.EmbedBuilder()
      .setTitle("Membro silenciado")
      .addFields(
        {
          name: "Membro:",
          value: `${Member}`,
        },
        { name: `Executado por:`, value: `${interaction.user}` },
        {
          name: `Duração:`,
          value: `<t:${Math.round((Date.now() + ms(time)) / 1000)}:R>`,
        }
      )
      .setColor(config.embedColor)
      .setTimestamp();

    Member1.roles.add(role.id);
    interaction.reply({
      embeds: [embedOK],
    });

    setTimeout(async () => {
      Member1.roles.remove(role.id);
    }, ms(time));
  },
};
