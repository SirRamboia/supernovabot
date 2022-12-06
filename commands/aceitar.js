const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aceitar")
    .setDescription("Aceitar uma sugestão")
    .addStringOption((option) =>
      option
        .setName("id_mensagem")
        .setDescription("Insere o ID de uma mensagem")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("motivo")
        .setDescription("Insere o motivo")
        .setRequired(true)
    ),

  async execute(interaction) {
    const embedPerm = new Discord.EmbedBuilder()
      .setDescription(`Não tens permissão de: \`Administrador\``)
      .setColor(config.embedColor);

    const embedOK = new Discord.EmbedBuilder()
      .setDescription(`Sugestão aceite!`)
      .setColor(config.embedColor);

    const embedNotFound = new Discord.EmbedBuilder()
      .setDescription(
        `Essa sugestão não existe, verifica o ID da Mensagem\nEscreve \`/aceitar [ID da Sugestão] [motivo]\``
      )
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

    const messageID = interaction.options.getString("id_mensagem");
    const acceptQuery = interaction.options.getString("motivo");

    try {
      const suggestedMsg = await interaction.guild.channels.cache
        .get(config.channels.sugestoes)
        .messages.fetch(`${messageID}`);

      if (suggestedMsg.embeds[0].data.fields[0].value) {
        const newEmbed1 = new Discord.EmbedBuilder()
          .setColor("65de98")
          .setDescription(`${suggestedMsg.embeds[0].data.description}`)
          .addFields(
            {
              name: "Sugestão enviada por:",
              value: `${suggestedMsg.embeds[0].data.fields[0].value}`,
            },
            {
              name: "Status:",
              value: `Sugestão aceite.\n**Motivo:** ${acceptQuery}`,
            }
          );
        suggestedMsg.edit({
          embeds: [newEmbed1],
        });
      } else {
        const newEmbed2 = new Discord.EmbedBuilder()
          .setColor("65de98")
          .setDescription(`${suggestedMsg.embeds[0].data.description}`)
          .addFields({
            name: "Status:",
            value: `Sugestão aceite.\n**Motivo:** ${acceptQuery}`,
          });
        suggestedMsg.edit({
          embeds: [newEmbed2],
        });
      }

      return interaction.reply({
        embeds: [embedOK],
        ephemeral: true,
      });
    } catch (err) {
      console.log(err);
      interaction.reply({
        embeds: [embedNotFound],
        ephemeral: true,
      });
    }
  },
};
