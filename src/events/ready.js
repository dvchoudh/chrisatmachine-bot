const { Client } = require("discord.js");

/**
 *
 * @param {Client} client
 */

module.exports = async (client) => {
  client.user.setPresence({
    status: "online",
    activities: [
      {
        name: "the prefix . | .help",
        type: "PLAYING",
      },
    ],
  });
  console.log(`[ API ] Logged in as ${client.user.tag}`);
};
