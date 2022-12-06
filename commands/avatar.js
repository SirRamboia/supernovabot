const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription(`Mostra o avatar de um usuário!`)
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Indique um usuário")
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("usuário");

    const row = new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder()
        .setLabel("🔗 Link do Avatar")
        .setURL(
          `${user.displayAvatarURL({
            dynamic: true,
            size: 4096,
          })}`
        )
        .setStyle(Discord.ButtonStyle.Link)
    );

    const embed = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL(),
      })
      .setImage(
        user.displayAvatarURL({
          dynamic: true,
          extension: "png",
          size: 4096,
        })
      );

    return interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
