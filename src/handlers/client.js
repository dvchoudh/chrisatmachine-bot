const { Client, Collection } = require("discord.js");

/**
 *
 * @param {Client} client
 */

module.exports = async (client) => {
  client.commands = new Collection();
  client.slashcommands = new Collection();
  client.config = require("dotenv").config();

  // if (!client.config.token || !client.config.prefix)
  //   throw new Error("Please provide the required things in config.json");
};
