//@ts-check
const { CustomEmbed } = require("../../utils/utils");
const { setCooldown } = require("../../utils/utils");
const { MessageEmbed } = require("discord.js");
const { red } = require("../../../config/colors.json");
/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "twitter",
  category: "Socials",
  aliases: ["twit"],
  clientPerms: ["SEND_MESSAGES"],
  description: "Sends a link to your Twitter profile.",
  usage: ">ping",

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    const embed = new MessageEmbed()
      .setTitle(`Chris's Twitter`)
      .setDescription(
        "[View Chris's twitter](https://twitter.com/chrisatmachine)"
      )
      .setColor(red);

    message.channel.send({ embed });
  },
};

//https://matrix.to/#/+atmachine:matrix.org
