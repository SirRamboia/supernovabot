const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ajuda")
    .setDescription("Menu de Ajuda"),

  async execute(interaction) {
    let painel = new Discord.ActionRowBuilder().addComponents(
      new Discord.SelectMenuBuilder()
        .setCustomId("menu")
        .setPlaceholder("Clique aqui")
        .addOptions([
          {
            label: "Admininstação",
            description: "Comandos relacionados a Admininstação",
            emoji: "🛠️",
            value: "admin",
          },
          {
            label: "Diversão",
            description: "Comandos relacionados a Diversão",
            emoji: "😄",
            value: "fun",
          },
        ])
    );

    let embed0 = new Discord.EmbedBuilder()
      .setColor(config.embedColor)
      .setTitle("Lista de comandos")
      .setFooter({
        text: "🪐 | SuperNova ™",
        iconURL:
          "https://cdn.discordapp.com/attachments/863440335527084042/867038880817741854/logo-gg.png",
      })
      .setDescription(
        `Olá ${interaction.user}, para veres as categorias utiliza o menu abaixo\n\n> \`⚒️\` Categoria de Administração\n> \`😄\` Categoria de Diversão`
      );

    interaction
      .reply({
        embeds: [embed0],
        components: [painel],
        fetchReply: true,
      })
      .then((msg) => {
        const filtro = (interaction) => interaction.isSelectMenu();

        const coletor = msg.createMessageComponentCollector({
          filter: filtro,
        });

        coletor.on("collect", async (collected) => {
          let menu = collected.values[0];
          collected.deferUpdate();

          if (menu === "admin") {
            let Embed1 = new Discord.EmbedBuilder()
              .setColor(config.embedColor)
              .setTitle("Aqui tem os meus comandos de Administração!")
              .setDescription(`
\`\`/aceitar\`\` - Aceita a sugestão de um membro 
\`\`/anúncio\`\` - Emite um anúncio
\`\`/ban\`\` - Bane um membro
\`\`/clear\`\` - Apaga mensagens
\`\`/kick\`\` - Expulsa um membro
\`\`/lock\`\` - BLoqueia determinado canal
\`\`/mute\`\` - Dá mute num membro
\`\`/recusar\`\` - Recusa a sugestão de um membro
\`\`/unban\`\` - Retira o ban de um membro
\`\`/unlock\`\` - Desbloqueia determinado canal
\`\`/unmute\`\` - Retira o mute de um membro
\`\`/unwarn\`\` - Retira o warn de um membro
\`\`/warn\`\` - Dá warn num membro
`);
            await interaction.editReply({
              embeds: [Embed1],
            });
          } else if (menu === "fun") {
            let Embed2 = new Discord.EmbedBuilder()
              .setColor(config.embedColor)
              .setTitle("Aqui tem os meus comandos Gerais!")
              .setDescription(`
\`\`/8ball\`\` - Pergunta algo para a 8ball
\`\`/ajuda\`\` - Comando de ajuda
\`\`/anónimo\`\` - Envia uma mensagem anónima
\`\`/avatar\`\` - Vê o avatar de um membro
\`\`/beijar\`\` - Beija um membro
\`\`/dados\`\` - Lança os dados
\`\`/dick\`\` - Sus Dick
\`\`/howgay\`\` - Classificação de Gay
\`\`/kiss\`\` - Beija um membro
\`\`/mensagem\`\` - Faz o bot dizer uma mensagem
\`\`/slap\`\` - Dá uma chapada num membro
\`\`/sugerir\`\` - Comando de sugestão
`);

            await interaction.editReply({
              embeds: [Embed2],
            });
          }
        });
      });
  },
};
