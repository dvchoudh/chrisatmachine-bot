//@ts-check

const { MessageEmbed } = require("discord.js");
const { setCooldown } = require("../../utils/utils");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "docs",
  category: "LunarVim-Docs",
  aliases: ["documentation", "d"],
  clientPerms: ["SEND_MESSAGES"],
  description: "Command for viewing the documentation of LunarVim",
  usage: "c@m docs install",

  execute: async function ({ client, message, args }) {
    const search_query = args.join(" ");
    if (search_query == "install") {
      const install_link = "https://www.lunarvim.org/01-installing.html#stable";
      const embed = new MessageEmbed()
        .setTitle("LunarVim Installation")
        .setURL(install_link)
        .setDescription(
          "LunarVim is an IDE layer for Neovim 0.5 taking advantage of new advancements in Lua scripting such as Treesitter and the Language Server Protocol. LunarVim is opinionated, extensible and fast.\n\n**[Download LunarVim](https://www.lunarvim.org/01-installing.html#stable)**"
        )
        .setColor(0x00ff00);
      message.channel.send({ embed });
    }
  },
};
