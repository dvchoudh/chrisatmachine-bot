//@ts-check
const { MessageEmbed, Permissions } = require("discord.js");
const ytsr = require("ytsr");
const { red } = require("../../../config/colors.json");

//@ts-check

const { setCooldown } = require("../../utils/utils");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "slowmode",
  category: "Moderation",
  aliases: ["sm"],
  clientPerms: ["MANAGE_MESSAGES"],

  execute: async function ({ client, message, args }) {
    // @ts-ignore
    // if (!message.member.permissions.has([Permissions.FLAGS.MANAGE_MESSAGES])){
    //   const errorEmbed = new MessageEmbed()
    //     .setDescription(
    //       `${message.author}, You do not have permission to run this command!`
    //     )
    //     .setColor("RED");
    //   return message.channel.send({embeds: [errorEmbed]});
    // }
    // @ts-ignore
    if (!args[0]) return message.reply("You must specify a time in seconds.");
    const time = parseInt(args[0]);
    if (isNaN(time))
      return message.reply("You must specify a number of seconds.");
    if (time < 0)
      return message.reply(
        "You must specify a number of seconds greater than 0."
      );
    if (time > 21600)
      return message.reply("You cannot set a slowmode longer than 6 hours.");

    // @ts-ignore
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(`Slowmode has been set to: ${args[0]} Seconds`);
  },
};
