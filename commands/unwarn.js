const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-PT");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unwarn")
    .setDescription("Remove o warn a um membro")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Seleciona um usuário")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("motivo")
        .setDescription("Insere um motivo")
        .setRequired(true)
    ),

  async execute(interaction) {
    const Member = interaction.options.getUser("usuário");
    const Member1 = interaction.options.getMember("usuário");
    const motivo = interaction.options.getString("motivo");

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

    const aviso = new Discord.EmbedBuilder()
      .setTitle("🚨 Advêrtecia removida")
      .setThumbnail(Member.displayAvatarURL({ dynimc: true }))
      .addFields(
        {
          name: "🙋‍♂️ Membro:",
          value: `> ${Member}`,
        },
        {
          name: "👮‍♂️ Removido por:",
          value: `> ${interaction.user}`,
        },
        {
          name: "💬 Motivo:",
          value: `\`\`\`${motivo}\`\`\``,
        }
      )
      .setColor(config.embedColor);

    const noWarn = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(`${config.emojis.reddown} O membro não tem advêrtecias!`);

    if (Member1.roles.cache.has(config.roles.rolesWarn.w3)) {
      Member1.roles.remove(config.roles.rolesWarn.w3);
      interaction.reply({
        embeds: [aviso],
      });
    } else {
      if (Member1.roles.cache.has(config.roles.rolesWarn.w2)) {
        Member1.roles.remove(config.roles.rolesWarn.w2);
        interaction.reply({
          embeds: [aviso],
        });
      } else {
        if (Member1.roles.cache.has(config.roles.rolesWarn.w1)) {
          Member1.roles.remove(config.roles.rolesWarn.w1);
          interaction.reply({
            embeds: [aviso],
          });
        } else {
          interaction.reply({
            embeds: [noWarn],
          });
        }
      }
    }
  },
};
