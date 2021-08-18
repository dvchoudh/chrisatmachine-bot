const { Client } = require("discord.js");
const { readdirSync } = require("fs");

/**
 *
 * @param {Client} client
 */

module.exports = async (client) => {
  const files = readdirSync("./events/").filter((files) =>
    files.endsWith(".js")
  );
  for (const file of files) {
    const events = require(`../events/${file}`);
    client.on(file.split(".")[0], events.bind(null, client));
    console.log(`Event Loaded: ${file.split(".")[0]}`);
  }
};
