const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beijar")
    .setDescription("Beija um membro")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Seleciona um usuário para beijar")
        .setRequired(true)
    ),

  async execute(interaction) {
    var list = [
      "https://i.imgur.com/sGVgr74.gif",
      "https://i.imgur.com/8LKPbOf.gif",
      "https://i.imgur.com/TItLfqh.gif",
      "https://i.imgur.com/wQjUdnZ.gif",
      "https://i.imgur.com/lmY5soG.gif",
      "https://i.imgur.com/YbNv10F.gif",
      "https://i.imgur.com/KLVAl0T.gif",
      "https://i.imgur.com/IgGumrf.gif",
      "https://i.imgur.com/KKAMPju.gif",
      "https://i.imgur.com/e0ep0v3.gif",
      "https://i.imgur.com/mNEHfJ0.gif",
      "https://i.imgur.com/0WWWvat.gif",
      "https://i.imgur.com/MGdlYsj.gif",
      "https://i.imgur.com/f86DzYb.gif",
      "https://i.imgur.com/4h7uBat.gif",
      "https://i.imgur.com/YOQgZqY.gif",
      "https://i.imgur.com/s3DggdT.gif",
      "https://i.imgur.com/KWM6eIB.gif",
      "https://i.imgur.com/709chb9.gif",
      "https://i.imgur.com/YkrEkbF.gif",
    ];

    var rand = list[Math.floor(Math.random() * list.length)];
    const user1 = interaction.options.getUser("usuário");

    let avatar = user1.displayAvatarURL({
      format: "png",
    });

    const embed = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(`${interaction.user} deu um beijo a ${user1}`)
      .setThumbnail(avatar)

    await interaction.reply({
      content: `${user1}`,
      embeds: [embed],
    });
  },
};
