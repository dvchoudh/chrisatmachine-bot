require("dotenv").config();
const discord = require("discord.js");
const { Intents, Collection, MessageEmbed } = require("discord.js")
const mongoose = require("mongoose");
const { registerCommands, registerEvents } = require("./utils/registry");
const { log } = require("./utils/utils");
const { Player } = require("discord-player");
const fs = require("fs");
require("discord-reply");
const client = new discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const player = new Player(client);

client.player = player;

client.on("ready", () => {

  client.user.setPresence({ activities: [{ name: 'with discord.js' }], status: 'idle' });
});

(async () => {
  client.commands = new Collection();
  client.categories = new Collection();
  client.guildInfoCache = new Collection();
  client.userInfoCache = new Collection();

  client.DBGuild = require("../schemas/guildSchema");
  client.DBConfig = require("../schemas/config");
  client.DBUser = require("../schemas/userSchema");

  client.serverCooldowns = new Collection();
  client.globalCooldowns = new Collection();

  await registerEvents(client, "../eventHandlers");
  await registerCommands(client, "../commands");

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const blacklistFetch = await client.DBConfig.findByIdAndUpdate(
      "blacklist",
      {},
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).then((doc) => {
      return JSON.parse(JSON.stringify(doc));
    });
    client.blacklistCache = new Set(blacklistFetch.blacklisted);
    log("SUCCESS", "src/main.js", "Connected to the database.");
  } catch (e) {
    log(
      "ERROR",
      "src/main.js",
      `Error connecting to the database: ${e.message}`
    );
    log(
      "ERROR",
      "src/main.js",
      "As of now, the prefab heavily relies on a successful connection.\nThere is a short guide on how to setup a MongoDB cluster (online cluster, not localhost) over at https://github.com/canta-slaus/bot-prefab/wiki/Setting-up-a-cluster"
    );
    process.exit(1);
  }

  try {
    await client.login(process.env.TOKEN);
    log("SUCCESS", "src/main.js", `Logged in as ${client.user.tag}`);
  } catch (e) {
    log("ERROR", "src/main.js", `Error logging in: ${e.message}`);
  }

  log(
    "SUCCESS",
    "src/main.js",
    "Added all commands, categories, events, schemas and connected to MongoDB."
  );
})();


