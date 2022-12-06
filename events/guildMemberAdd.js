const Discord = require("discord.js");
const config = require("../config.json");

module.exports = (client, member) => {
  let embed = new Discord.EmbedBuilder()
    .setColor(config.embedColor)
    .setImage(
      "https://cdn.discordapp.com/attachments/863440335527084042/882371661905670155/BannerSejaBemVindoSuperNova.png"
    ).setDescription(`
> 👋🏻  Bem vindo ao servidor <@${member.id}>
> 📚  Lê as <#${config.channels.regras}> para evitares seres punido
> ${config.emojis.PurpleSN} Por fim, diverte-te!

> Sabias que és o membro \`#${member.guild.memberCount}\`
> Caso precises de ajuda chama algum Mod/Admin
`);

  let embedGeneral = new Discord.EmbedBuilder()
    .setColor(config.embedColor)
    .setImage(
      "https://cdn.discordapp.com/attachments/754647473510678579/943530727809626122/SuperNova_Banner.png"
    ).setDescription(`
> ${config.emojis.galaxy} | <@${member.id}> bem-vindo ao 𝘚𝘶𝘱𝘦𝘳𝘕𝘰𝘷𝘢🌌™! 
> ${config.emojis.PurpleSN} | Não te esqueças de preencher o <#${config.channels.registo}> 
> ${config.emojis.PurpleSNlogo} | Esperemos que gostes de ca estar...
`);

  client.channels.cache
    .get(config.channels.chatGeral)
    .send({
      embeds: [embedGeneral],
    })
    .then((msg) => {
      setTimeout(() => msg.delete(), 10000);
    });

  client.channels.cache.get(config.channels.entradaLog).send({
    embeds: [embed],
  });

  let joinRole1 = member.guild.roles.cache.find(
    (role) => role.id == config.roles.recruta
  );
  member.roles.add(joinRole1.id);
};
