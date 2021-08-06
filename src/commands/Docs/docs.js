//@ts-check

const { MessageEmbed } = require("discord.js");
const { setCooldown } = require("../../utils/utils");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "docs",
  category: "Docs",
  aliases: ["d"],
  clientPerms: ["SEND_MESSAGES"],

  execute: async function ({ client, message, args }) {
    const search_query = args.join(" ");
    if (search_query == "install") {
      const install_link = "https://www.lunarvim.org/01-installing.html#stable";
      const embed = new MessageEmbed()
        .setTitle("LunarVim Installation")
        .setURL(install_link)
        .setDescription(
          "LunarVim is a powerful and easy to use text editor for programmers. It is written in javascript and is available for Windows, Linux and macOS.\n\n**[Download LunarVim](https://www.lunarvim.org/01-installing.html#stable)**"
        )
        .setThumbnail(install_link)
        .setColor(0x00ff00);
      message.channel.send({ embed });
    }
  },
};
