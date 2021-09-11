const { Client } = require("discord.js");
require("dotenv").config();
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_BANS",
    "GUILD_INVITES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
	"GUILD_MESSAGE_REACTIONS"
  ],
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true,
  },
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
});

//Handlers
require("./handlers/client")(client);
require("./handlers/events")(client);
require("./handlers/commands")(client);
// require("./handlers/slash_commands")(client);

client.login(process.env.TOKEN);
