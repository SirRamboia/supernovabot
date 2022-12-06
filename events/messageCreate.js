const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async (client, message) => {
  // Message when mention the bot
  if (message.content === `<@${config.clientId}>`) {
    const mentionEmbed = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(
        `Olá ${message.author}!\nVê todos os meus comandos fazendo \`/ajuda\``
      );

    message.channel.send({
      embeds: [mentionEmbed],
    });
  }

  // Check if the message content includes any invite link
  if (
    message.content.match(
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g
    )
  ) {
    if (
      !message.member.permissions.has(
        Discord.PermissionsBitField.Flags.Administrator
      )
    ) {
      // Delete message
      message.delete();

      // Create embed
      const embedDeny = new Discord.EmbedBuilder()
        .setTitle(`Link recusado!`)
        .setDescription(
          `${config.emojis.reddown} Apenas membros com permissão de \`Admininstrador\` podem enviar links de outros servidores de Discord!\n> || \`${message.content}\`||`
        )
        .setColor(config.embedColor);

      // Send DM to user
      return message.author.send({
        embeds: [embedDeny],
      });
    }
  }
};
