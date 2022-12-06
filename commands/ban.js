const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bane um membro")
    .addUserOption((option) =>
      option
        .setName("membro")
        .setDescription("Seleciona um membro")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("Qual o motivo?")
    ),

  async execute(interaction, client) {
    const embed1 = new Discord.EmbedBuilder()
      .setDescription(`Não tens permissão de: \`Banir Membros\``)
      .setColor(config.embedColor);

    const embed2 = new Discord.EmbedBuilder()
      .setDescription(`Eu não tenho permissão de: \`Banir Membros\``)
      .setColor(config.embedColor);

    const embed4 = new Discord.EmbedBuilder()
      .setDescription(
        `${config.emojis.reddown} Não foi possível obter detalhes relacionados com esse membro.`
      )
      .setColor(config.embedColor);

    const embed5 = new Discord.EmbedBuilder()
      .setDescription(
        `${config.emojis.reddown} Não foi possível banir o membro, verifica se estou acima do cargo do membro que deseja banir!`
      )
      .setColor(config.embedColor);

    if (
      !interaction.member.permissions.has(
        Discord.PermissionsBitField.Flags.BanMembers
      )
    ) {
      return interaction.reply({
        embeds: [embed1],
        ephemeral: true,
      });
    }

    if (
      !interaction.guild.members.me.permissions.has(
        Discord.PermissionsBitField.Flags.BanMembers
      )
    ) {
      return interaction.reply({
        embeds: [embed2],
        ephemeral: true,
      });
    }

    const user = interaction.options.getUser("membro");
    const reason = interaction.options.getString("motivo") || "noreason123";
    const member =
      interaction.guild.members.cache.get(user.id) ||
      (await interaction.guild.members.fetch(user.id));

    if (!member) {
      return interaction.reply({
        embeds: [embed4],
        ephemeral: true,
      });
    }

    if (!member.bannable || !member.manageable) {
      return interaction.reply({
        embeds: [embed5],
        ephemeral: true,
      });
    }

    const embed = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setTimestamp();

    const embedDM = new Discord.EmbedBuilder()
      .setTitle(`Foste banido do SuperNova`)
      .setDescription(`> Foi aplicada uma punição referente a:`)
      .setColor(config.embedColor)
      .setTimestamp()


    if (reason && reason !== "noreason123") {
      embed.setDescription(
        `**${member.user.tag}** foi banido do servidor, pelo motivo de: \`${reason}\``
      );
      embedDM.addFields(
        {
          name: `Servidor`,
          value: `> Nome: \`${interaction.guild.name}\`\n> ID: \`${interaction.guild.id}\``,
        },
        {
          name: `Informações`,
          value: `> Ação: \`Banimento\`\n> Motivo: \`${reason}\``,
        }
      );
    } else {
      embed.setDescription(
        `**${member.user.tag}** foi banido do servidor.`
      );
      embedDM.addFields(
        {
          name: `Servidor`,
          value: `> Nome: \`${interaction.guild.name}\`\n> ID: \`${interaction.guild.id}\``,
        },
        {
          name: `Informações`,
          value: `> Ação: \`Banimento\``,
        }
      );
    }

    member.user
      .send({
        embeds: [embedDM],
      })
      .catch((err) => console.log(err));

    member.ban({
      reason,
    });

    return interaction.reply({
      embeds: [embed],
    });
  },
};
