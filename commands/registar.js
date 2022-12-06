const { SlashCommandBuilder } = require(`@discordjs/builders`);
const config = require("../config.json");
const Discord = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`registar`)
    .setDescription(`Regista um membro`)
    .addUserOption((option) =>
      option
        .setName(`membro`)
        .setDescription(`Seleciona um membro`)
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const member = interaction.options.getMember("membro");

    let embed1 = new Discord.EmbedBuilder()
      .setDescription(
        `${config.emojis.reddown} | Apenas <@&${config.roles.gerenteVerificacao}> podem executar este comando!`
      )
      .setColor(config.embedColor);

    if (!interaction.member.roles.cache.has(config.roles.gerenteVerificacao))
      return interaction.reply({
        embeds: [embed1],
        ephemeral: true,
      });

    let joinRole1 = interaction.guild.roles.cache.find(
      (role) => role.id == config.roles.rolesVerify.r1
    );
    let joinRole2 = interaction.guild.roles.cache.find(
      (role) => role.id == config.roles.rolesVerify.r2
    );
    let joinRole3 = interaction.guild.roles.cache.find(
      (role) => role.id == config.roles.rolesVerify.r3
    );
    let joinRole4 = interaction.guild.roles.cache.find(
      (role) => role.id == config.roles.rolesVerify.r4
    );
    let joinRole5 = interaction.guild.roles.cache.find(
      (role) => role.id == config.roles.rolesVerify.r5
    );
    let recuta = interaction.guild.roles.cache.find(
      (role) => role.id == config.roles.recruta
    );

    member.roles.add(joinRole1.id);
    member.roles.add(joinRole2.id);
    member.roles.add(joinRole3.id);
    member.roles.add(joinRole4.id);
    member.roles.add(joinRole5.id);
    member.roles.remove(recuta.id)

    let embedEnd = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(
        `${config.emojis.greenup} ${member} foi verificado com sucesso!`
      );

    interaction.reply({
      embeds: [embedEnd],
    });

    let embedLog = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setTitle("Membro registado")
      .addFields(
        { name: `Utilizador:`, value: `${member} (${member.id})` },
        { name: `Registado por:`, value: `${interaction.user}` }
      );

    interaction.client.channels.cache.get(config.channels.registoLog).send({
      embeds: [embedLog],
    });
  },
};
