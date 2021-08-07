//@ts-check

const { setCooldown } = require("../../utils/utils");
const { MessageEmbed } = require("discord.js");
const ytsr = require("ytsr");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "youtube",
  category: "Socials",
  aliases: ["ty"],
  clientPerms: ["SEND_MESSAGES"],

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    const searchResults = await ytsr(args.join(" "), { limit: 2 });

    const video = searchResults["items"][0]["url"];

    message.channel.send(video);
  },
};
