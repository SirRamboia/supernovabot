const Discord = require("discord.js");
const config = require("../config.json");

module.exports = (client, member) => {
  const embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: member.user.tag,
      iconURL: member.user.displayAvatarURL(),
    })
    .setColor(config.embedColorRed)
    .setImage(
      "https://cdn.discordapp.com/attachments/863440335527084042/882371658390863892/BannerAteBreveSuperNova.png"
    )
    .setDescription(
      `**${member.user.username}** foi pelo espaço fora... ${config.emojis.saturn}`
    );

  client.channels.cache.get(config.channels.saidasLog).send({
    embeds: [embed],
  });
};
