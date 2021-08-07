//@ts-check
const { CustomEmbed } = require("../../utils/utils");
const { setCooldown } = require("../../utils/utils");
const { MessageEmbed } = require("discord.js");
const { red } = require("../../../config/colors.json");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "matrix",
  category: "Socials",
  aliases: ["mat"],
  clientPerms: ["SEND_MESSAGES"],

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    const embed = new MessageEmbed()
      .setTitle(`Chris's Matrix Community1`)
      .setDescription(
        "[View Chris's Matrix Community!](https://matrix.to/#/+atmachine:matrix.org)"
      )
      .setColor(red);

    message.channel.send({ embed });
  },
};

//https://matrix.to/#/+atmachine:matrix.org
