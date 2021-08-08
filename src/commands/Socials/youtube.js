//@ts-check
const { CustomEmbed } = require("../../utils/utils");
const { setCooldown } = require("../../utils/utils");
const { MessageEmbed } = require("discord.js");
const { red } = require("../../../config/colors.json");
/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "youtube",
  category: "Socials",
  aliases: ["yt"],
  clientPerms: ["SEND_MESSAGES"],
  description: "Sends a link to your Twitter profile.",
  usage: ">yt",

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    const embed = new MessageEmbed()
      .setTitle(`Chris's Youtube`)
      .setDescription(
        "[View Chris's Youtube](https://www.youtube.com/channel/UCS97tchJDq17Qms3cux8wcA)"
      )
      .setColor(red);

    message.channel.send({ embed });
  },
};

//https://matrix.to/#/+atmachine:matrix.org
