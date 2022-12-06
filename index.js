require("dotenv").config();

// Prevent the bot from crashing
process.on("uncaughtException", (error) => {
  console.log(error.stack);
});

// DiscordClient setup
const Discord = require("discord.js");

const client = new Discord.Client({
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: false,
  },
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildWebhooks,
  ],
  partials: [
    Discord.Partials.Channel,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
  ],
  restTimeOffset: 0,
  presence: { activities: [{ name: "/ajuda • ☄️ | SuperNova" }] },
});

// Load config file (config.json)
const config = require("./config.json");
const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

// Read commands
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
// Read events
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

// Create a Discord.Collection
client.commands = new Discord.Collection();

// Set commands array
const commands = [];

// Register the commands
for (const file of commandFiles) {
  const props = require(`./commands/${file}`);
  // console.log(`Command loaded: ${props.data.name}`);
  client.commands.set(props.data.name, props);
  commands.push(props.data.toJSON());
}

// Initialize REST
const rest = new REST({ version: "10" }).setToken(process.env.clientToken);

// Publish commands to the API
rest
  .put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
    body: commands,
  })
  .then(() =>
    console.log("[SlashCommands] Successfully registered application commands")
  )
  .catch(console.error);

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
}

// Client login
client.login(process.env.clientToken);
