//@ts-check
const { CustomEmbed } = require("../../utils/utils");
const { setCooldown } = require("../../utils/utils");
const { MessageEmbed } = require("discord.js");
const { red } = require("../../../config/colors.json");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "github",
  category: "Socials",
  aliases: ["gh"],
  clientPerms: ["SEND_MESSAGES"],

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    const embed = new MessageEmbed()
      .setDescription(
        "[View Chris' GitHub](https://github.com/ChristianChiarulli)"
      )
      .setColor("RED");

    message.channel.send({ embeds: [embed] });
  },
};
