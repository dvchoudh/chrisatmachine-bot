//@ts-check

const { MessageEmbed } = require("discord.js");
const { setCooldown } = require("../../utils/utils");
const PREFIX = process.env.PREFIX;
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
    const search_query = args[0];
    const args2 = args[1];

    if (!search_query) {
      const embed = new MessageEmbed()
        .setTitle("Lunarvim Docs")
        .setDescription(
          "LunarVim is an IDE layer for Neovim 0.5 taking advantage of new advancements in Lua scripting such as Treesitter and the Language Server Protocol. LunarVim is opinionated, extensible and fast."
        )
        .addField(
          "LunarVim Installation - Stable",
          "`.docs install stable`",
          true
        )
        .addField(
          "LunarVim Installation - Rolling",
          "`.docs install rolling`",
          true
        )
        .addField(
          "LunarVim Installation Troubleshooting",
          "`.docs troubleshooting`",
          true
        )
        .addField("LunarVim Uninstallation", "`.docs uninstall`", true)

        .addField(
          "LunarVim Quickstart - Treesitter",
          "`.docs quickstart treesitter`",
          true
        )

        .addField(
          "LunarVim Quickstart - Language Server",
          "`.docs quickstart treesitter`",
          true
        )

        .addField(
          "LunarVim Quickstart - Nerd Fonts",
          "`.docs quickstart fonts `",
          true
        )

        .setColor("RED");
      message.channel.send({ embeds: [embed] });
    }

    if (search_query == "install" || search_query == "add") {
      if (!args2) {
        const myembed = new MessageEmbed()
          .setTitle("LunarVim Installation")
          .setDescription("LunarVim Installation Links")
          .addField("Stable", "`.docs install stable`", true)
          .addField("Rolling", "`.docs install rolling`", true)
          .addField("Troubleshooting", "`.docs install troubleshoot`", true)

          .setColor("RED");
        message.channel.send({ embeds: [myembed] });
      }
      if (args2 == "stable") {
        const install_link =
          "https://www.lunarvim.org/01-installing.html#rolling";
        const embed = new MessageEmbed()
          .setTitle("LunarVim Installation - Stable")
          .setURL(install_link)
          .setDescription("Installing the stable verion of LunarVim")
          .setColor("RED");

        message.channel.send({ embeds: [embed] });
      }

      if (args2 == "rolling") {
        const install_link =
          "https://www.lunarvim.org/01-installing.html#rolling";
        const embed = new MessageEmbed()
          .setTitle("LunarVim Installation - Rolling")
          .setURL(install_link)
          .setDescription("Installing the rolling [beta] verion of LunarVim")
          .setColor("RED");
        message.channel.send({ embeds: [embed] });
      }

      if (args2 == "troubleshoot" || args2 == "troubleshooting") {
        const install_link =
          "https://www.lunarvim.org/01-installing.html#troubleshooting-installation-problems";
        const embed = new MessageEmbed()
          .setTitle("LunarVim Installation - Troubleshooting")
          .setURL(install_link)
          .setDescription(
            "Troubleshooting problems with installation of LunarVim"
          )
          .setColor("RED");
        message.channel.send({ embeds: [embed] });
      }
    }

    if (search_query == "uninstall") {
      const install_link =
        "https://www.lunarvim.org/01-installing.html#uninstall";
      const embed = new MessageEmbed()
        .setTitle("LunarVim Uninstallation")
        .setURL(install_link)
        .setDescription("Uninstall LunarVim")
        .setColor("RED");
      message.channel.send({ embeds: [embed] });
    }

    if (search_query == "quickstart" && args2 == "treesitter") {
      const install_link =
        "https://www.lunarvim.org/02-after-install.html#tree-sitter";
      const embed = new MessageEmbed()
        .setTitle("LunarVim Quickstart - Treesitter")
        .setURL(install_link)
        .setDescription("Install the treesitter on LunarVim")
        .setColor("RED");
      message.channel.send({ embeds: [embed] });
    }

    if (search_query == "quickstart" && args2 == "langserver") {
      const install_link =
        "https://www.lunarvim.org/02-after-install.html#tree-sitter";
      const embed = new MessageEmbed()
        .setTitle("LunarVim QUuckstart - Language Server")
        .setURL(install_link)
        .setDescription(
          "Install the Language Server for better Syntax Highlighting and Autocompletion"
        )
        .setColor("RED");
      message.channel.send({ embeds: [embed] });
    }

    if (
      (search_query == "quickstart" && args2 == "fonts") ||
      search_query == "font" ||
      search_query == "fonts" ||
      args2 == "nerdfonts"
    ) {
      const install_link =
        "https://www.lunarvim.org/02-after-install.html#nerd-fonts";
      const embed = new MessageEmbed()
        .setTitle("LunarVim Quickstart - Nerd Fonts")
        .setURL(install_link)
        .setDescription(
          "Install NerdFont on your system for rendering the icons"
        )
        .setColor("RED");
      message.channel.send({ embeds: [embed] });
    }
  },
};
