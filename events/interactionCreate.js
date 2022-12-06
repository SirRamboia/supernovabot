const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async (client, interaction) => {
  // Check if the interaction is used in a DM, if it is, it will return an error
  if (interaction.channel.type === Discord.ChannelType.DM) {
    // Create embed
    const dm = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(
        `${config.emojis.reddown} Eu não respondo a DM's\nUsa-me no [servidor do SuperNova](${config.serverLink})`
      );

    return interaction.reply({
      embeds: [dm],
    });
  }

  if (interaction.isButton()) {
    // Button ID 'c'
    if (interaction.customId === "c") {
      // Search for any open tickets of the member
      const achando = interaction.guild.channels.cache.find(
        (a) => a.name === `ticket-${interaction.user.id}`
      );

      const embed1 = new Discord.EmbedBuilder()
        .setDescription(`Já tem um ticket aberto em ${achando}`)
        .setColor(config.embedColor);

      // If it finds a ticket that is already open, it returns an error
      if (achando) {
        return interaction.reply({
          embeds: [embed1],
          ephemeral: true,
        });
      }

      // No open tickets found
      // Continue...

      const embed2 = new Discord.EmbedBuilder()
        .setDescription(
          `${config.emojis.error} Eu não tenho permissão de: \`Gerenciar Canais\``
        )
        .setColor(config.embedColor);

      // Check if the bot has permission to 'Manage Channels'
      if (
        !interaction.guild.members.me.permissions.has(
          Discord.PermissionsBitField.Flags.ManageChannels
        )
      ) {
        return interaction.reply({
          embeds: [embed2],
          ephemeral: true,
        });
      }

      // Create ticket channel
      interaction.guild.channels
        .create({
          parent: config.category.openTickets,
          name: `ticket-${interaction.user.id}`,
          type: Discord.ChannelType.GuildText,
          permissionOverwrites: [
            ...interaction.guild.roles.cache
              .filter((r) =>
                r.permissions.has(
                  Discord.PermissionsBitField.Flags.ManageMessages
                )
              )
              .map((r) => ({
                id: r.id,
                allow: [
                  Discord.PermissionsBitField.Flags.ViewChannel,
                  Discord.PermissionsBitField.Flags.SendMessages,
                ],
              })),
            {
              id: interaction.guild.id,
              deny: [Discord.PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionsBitField.Flags.ViewChannel,
                Discord.PermissionsBitField.Flags.SendMessages,
              ],
            },
            {
              id: client.user.id,
              allow: [
                Discord.PermissionsBitField.Flags.ViewChannel,
                Discord.PermissionsBitField.Flags.SendMessages,
              ],
            },
          ],
        })
        .then((channel) => {
          const embed3 = new Discord.EmbedBuilder()
            .setDescription(`O ticket foi criado em ${channel}`)
            .setColor(config.embedColor);

          // Send opening message in the ticket HUD channel
          interaction.reply({
            embeds: [embed3],
            ephemeral: true,
          });

          // Create button to close the ticket
          const row = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("f")
              .setLabel(`Fecha o ticket`)
              .setStyle(Discord.ButtonStyle.Danger)
          );

          const embed = new Discord.EmbedBuilder()
            .setDescription(
              `A <@&${config.roles.staff}> vai ajudar-te em breve!\nPara fechar o ticket, carrega no botão abaixo.`
            )
            .setColor(config.embedColor);

          // Send opening message in the ticket channel
          channel
            .send({
              content: `${interaction.user}`,
              embeds: [embed],
              components: [row],
            })
            .then((msg) => {
              // Pin message
              msg.pin();
            });
        });
    }

    // Button ID 'f'
    if (interaction.customId === "f") {
      // Create embeds
      const channelInParent = new Discord.EmbedBuilder()
        .setDescription(
          `O canal já se encontra fechado!\nPara o apagar, carregue no botão de \`Apagar o ticket\``
        )
        .setColor(config.embedColor);

      const Embed4 = new Discord.EmbedBuilder()
        .setDescription(
          `O ticket será fechado em alguns segundos. Aguarde.`
        )
        .setColor(config.embedColor);

      // Check if the ticket is already closed
      if (interaction.channel.parentId === config.category.closeTickets) {
        return interaction.reply({
          embeds: [channelInParent],
          ephemeral: true,
        });
        // End.
      }

      // The ticket is not closed
      // Continue...

      // Sends a message saying that the ticket will be archived in a few seconds
      interaction.reply({
        embeds: [Embed4],
      });

      const row0 = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("fd")
          .setLabel(`Apaga o ticket`)
          .setStyle(Discord.ButtonStyle.Danger)
      );

      // Change ticket channel category
      await interaction.channel
        .setParent(config.category.closeTickets)
        .then(async () => {
          // Change channel permissions
          await interaction.channel.permissionOverwrites.set([
            ...interaction.guild.roles.cache
              .filter((r) =>
                r.permissions.has(
                  Discord.PermissionsBitField.Flags.ManageMessages
                )
              )
              .map((r) => ({
                id: r.id,
                allow: [Discord.PermissionsBitField.Flags.ViewChannel],
                deny: [Discord.PermissionsBitField.Flags.ManageMessages],
              })),
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionsBitField.Flags.ViewChannel,
                Discord.PermissionsBitField.Flags.ManageMessages,
              ],
            },
            {
              id: client.user.id,
              allow: [
                Discord.PermissionsBitField.Flags.ViewChannel,
                Discord.PermissionsBitField.Flags.SendMessages,
              ],
            },
          ]);

          // Get Old Channel Name
          const nameOld = interaction.channel.name;

          // Add '[CLOSED]' prefix to the channel name
          await interaction.channel.setName(`[CLOSED] ${nameOld}`);
          // Create embed
          const EmbedFin = new Discord.EmbedBuilder()
            .setDescription(
              `${config.emojis.saturn} Este ticket foi dado como terminado/resolvido!`
            )
            .setColor(config.embedColor);

          // Send a message with a permanently delete ticket button
          await interaction.followUp({
            embeds: [EmbedFin],
            components: [row0],
          });
        });
    }

    // Button ID 'fd'
    if (interaction.customId === "fd") {
      // Delete channel
      interaction.channel.delete();
    }
  }

  const command = client.commands.get(interaction.commandName);
  // If the command does not exist/outdated, return
  if (!command) return;

  // Finally, run the interaction
  try {
    await command.execute(interaction, Discord, client, config);
  } catch (error) {
    console.log(error);
  }

  client.channels.cache.get(config.channels.logExecutedCommands).send({
    embeds: [
      new Discord.EmbedBuilder()
        .setDescription(
          `<t:${Math.floor(Date.now() / 1000)}:D> (<t:${Math.floor(
            Date.now() / 1000
          )}:T>)`
        )
        .addFields(
          {
            name: "Quem?",
            value: `> Utilizador: \`${interaction.user.tag}\`\n> ID: \`${interaction.user.id}\``,
            inline: false,
          },
          {
            name: "Comando",
            value: `\`\`\`${interaction}\`\`\``,
            inline: true,
          }
        )
        .setColor(config.embedColor),
    ],
  });
};
