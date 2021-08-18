const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  description: "Delete specified number of messages",
  perms: {
    client: [
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.EMBED_LINKS,
      Permissions.FLAGS.MANAGE_MESSAGES,
    ],
    user: [Permissions.FLAGS.MANAGE_MESSAGES],
  },
  aliases: [],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {STring[]} args
   */
  execute: async (client, message, args) => {
    const amount = parseInt(args.join(" ")); // Amount of messages which should be deleted
    if (!amount)
      return message.reply(
        "You haven't given an amount of messages which should be deleted!"
      ); // Checks if the `amount` parameter is given
    // @ts-ignore
    if (isNaN(amount))
      return message.reply("The amount parameter isn`t a number!"); // Checks if the `amount` parameter is a number. If not, the command throws an error

    if (amount > 100)
      return message.reply("You can`t delete more than 100 messages at once!"); // Checks if the `amount` integer is bigger than 100
    if (amount < 1)
      return message.reply("You have to delete at least 1 message!"); // Checks if the `amount` integer is smaller than 1

    await message.channel.messages.fetch({ limit: amount }).then((messages) => {
      // Fetches the messages
      // @ts-ignore
      message.channel.bulkDelete(
        messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
      );
    });

    const embed = new MessageEmbed()
      .setTitle(`Purged ${amount} messages`)
      .setColor("RED");

    message.channel.send({ embeds: [embed] });
  },
};
