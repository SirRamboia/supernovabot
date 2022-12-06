const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");
const moment = require("moment");
moment.locale("pt-PT");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Dá warn a um membro")
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
    const embedPerm = new Discord.EmbedBuilder()
      .setDescription(`Não tens permissão de: \`Banir Membros\``)
      .setColor(config.embedColor);

    const embedPermMe = new Discord.EmbedBuilder()
      .setDescription(`Eu não tenho permissão de: \`Banir Membros\``)
      .setColor(config.embedColor);

    const Member = interaction.options.getUser("usuário");
    const Member1 = interaction.options.getMember("usuário");

    const motivo = interaction.options.getString("motivo");

    if (
      !interaction.member.permissions.has(
        Discord.PermissionsBitField.Flags.BanMembers
      )
    )
      return interaction.reply({
        embeds: [embedPerm],
        ephemeral: true,
      });

    if (
      !interaction.guild.members.me.permissions.has(
        Discord.PermissionsBitField.Flags.BanMembers
      )
    )
      return interaction.reply({
        embeds: [embedPermMe],
        ephemeral: true,
      });

    const aviso1 = new Discord.EmbedBuilder()
      .setTitle("🚨 1º Advertência")
      .setThumbnail(
        Member.displayAvatarURL({
          dynimc: true,
        })
      )
      .addFields(
        {
          name: "🙋‍♂️ Membro:",
          value: `> ${Member}`,
        },
        {
          name: "👮‍♂️ Advêrtido por:",
          value: `> ${interaction.user}`,
        },
        {
          name: "🛑 Advertencia:",
          value: "> 1 de 3",
        },
        {
          name: "💬 Motivo:",
          value: `\`\`\`${motivo}\`\`\``,
        }
      )
      .setColor(config.embedColorRed);

    const aviso2 = new Discord.EmbedBuilder()
      .setTitle("🚨 2º Advertência")
      .setThumbnail(
        Member.displayAvatarURL({
          dynimc: true,
        })
      )
      .addFields(
        {
          name: "🙋‍♂️ Membro:",
          value: `> ${Member}`,
        },
        {
          name: "👮‍♂️ Advêrtido por:",
          value: `> ${interaction.user}`,
        },
        {
          name: "🛑 Advertencia:",
          value: "> 2 de 3",
        },
        {
          name: "💬 Motivo:",
          value: `\`\`\`${motivo}\`\`\``,
        }
      )
      .setColor(config.embedColorRed);

    const aviso3 = new Discord.EmbedBuilder()
      .setTitle("🚨 Auto Banimento")
      .setThumbnail(
        Member.displayAvatarURL({
          dynimc: true,
        })
      )
      .addFields(
        {
          name: "🙋‍♂️ Membro:",
          value: `> ${Member}`,
        },
        {
          name: "👮‍♂️ Advêrtido por:",
          value: `> ${interaction.user}`,
        },
        {
          name: "🛑 Advertencia:",
          value: "> 3 de 3 (Banimento)",
        },
        {
          name: "💬 Motivo:",
          value: `\`\`\`${motivo}\`\`\``,
        }
      )
      .setColor(config.embedColorRed);

    // é a primeira vez
    if (!Member1.roles.cache.has(config.roles.rolesWarn.w1)) {
      Member1.roles.add(config.roles.rolesWarn.w1);
      interaction.reply({
        embeds: [aviso1],
      });
    }

    // é a segunda vez
    if (
      Member1.roles.cache.has(config.roles.rolesWarn.w1) &&
      !Member1.roles.cache.has(config.roles.rolesWarn.w2)
    ) {
      Member1.roles.add(config.roles.rolesWarn.w2);
      interaction.reply({
        embeds: [aviso2],
      });
    }

    // é a terceira vez
    if (
      Member1.roles.cache.has(config.roles.rolesWarn.w1) &&
      Member1.roles.cache.has(config.roles.rolesWarn.w2)
    ) {
      const embedDM = new Discord.EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(`Foste banido do SuperNova`)
        .setDescription(`> Atingiste 3 advertências!`)
        .addFields(
          {
            name: `Servidor`,
            value: `> Nome: \`${interaction.guild.name}\`\n> ID: \`${interaction.guild.id}\``,
          },
          {
            name: `Informações`,
            value: `> Ação: \`Banimento automático\`\n> Motivo: \`Excesso de advertências\``,
          }
        );
      Member1.send({ embeds: [embedDM] });
      interaction.reply({
        embeds: [aviso3],
      });
      Member1.ban({
        reason: "3 advertências",
      });
    }
  },
};
