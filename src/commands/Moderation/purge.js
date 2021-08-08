//@ts-check

const { setCooldown } = require("../../utils/utils");
const { MessageEmbed } = require("discord.js");
const ytsr = require("ytsr");
const { red } = require("../../../config/colors.json");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "purge",
  category: "Moderation",
  aliases: ["clear"],
  clientPerms: ["MANAGE_MESSAGES"],

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    // @ts-ignore
    if (!message.member.hasPermission("MANAGE_MEMBERS")) {
      const errorEmbed = new MessageEmbed()
        .setDescription(`You do not have permission to run this command!`)
        .setColor("RED");
      return message.channel.send(errorEmbed);
    }
    // const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
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
      .setColor(red);

    message.channel.send(embed);
  },
};
