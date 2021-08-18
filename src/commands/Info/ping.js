const { Permissions, Client, Message } = require("discord.js");

module.exports = {
  name: "ping",
  description: "To get the latency of the bot.",
  perms: {
    client: [
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.EMBED_LINKS,
    ],
    user: [Permissions.FLAGS.SEND_MESSAGES],
  },
  aliases: [],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {STring[]} args
   */
  execute: async (client, message, args) => {
    message.reply({
      content: `Pong!!`,
    });
    const command = require(`../commands/${dir}/${file}`);

    message.channel.send(command.name);
  },
};
