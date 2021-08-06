//@ts-check

const { setCooldown } = require("../../utils/utils");
const { MessageEmbed } = require("discord.js");
const ytsr = require("ytsr");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "youtube",
  category: "Misc",
  aliases: ["ty"],
  clientPerms: ["SEND_MESSAGES"],

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    const query = args.join(" ");
    if (!query) return message.channel.send("Please specify a query.");
    const url = "https://www.youtube.com/results?search_query=";
    const regex = '/watch?v=(.*?)"';
    const res = await ytsr(query).catch((e) => {
      return message.channel.send("No results found.");
    });

    // @ts-ignore
    const video = res.items.filter((v) => v.type === "video")[0]; // eslint-disable-line no-param-reassign

    const embed = new MessageEmbed();
    embed.setTitle(video.title);
    embed.setURL(video.url);
    embed.setColor(0xff0000);
    embed.setDescription(video.description);
    // embed.setThumbnail(video.thumbnail.url);
    embed.setFooter(`${video.channel.title} | ${video.channel.url}`);
    message.channel.send({ embed });
  },
};
