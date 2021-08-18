require("dotenv").config();
const { Client, Message } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  const prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find((x) => x.aliases && x.aliases.includes(commandName));

  if (!command) return;

  if (!message.channel.permissionsFor(client.user).has(command.perms.client))
    return message.channel
      .send({
        content: `Missing Permission: ${command.perms.client
          .join(", ")
          .toLowerCase()}`,
      })
      .catch(() => {});

  if (!message.channel.permissionsFor(message.member).has(command.perms.user))
    return message.channel
      .send({
        content: `You don't have enough permission to execute this command.`,
      })
      .catch(() => {});

  try {
    command.execute(client, message, args, prefix);
  } catch (error) {
    console.error(error);
    await message.channel.send({
      content: "An unexpected error occured!",
    });
  }
};
