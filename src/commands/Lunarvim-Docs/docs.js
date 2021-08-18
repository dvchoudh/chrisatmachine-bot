const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "docs",
  description: "Lunarvim docs!",
  perms: {
    client: [
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.EMBED_LINKS,
    ],
    user: [Permissions.FLAGS.SEND_MESSAGES],
  },
  aliases: [],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {STring[]} args
   */
  execute: async (client, message, args) => {
    const search_query = args[0];
    const args2 = args[1];

    if (!search_query) {
      const embed = new MessageEmbed()
        .setTitle("Lunarvim Docs")
        .setDescription(
          "Search For Documentation about LunarVim \n\n Usage: `.docs searchQuery` \n\n Example: `.docs install`"
        )
        .setColor("RED");
      message.channel.send({ embeds: [embed] });
    }
    // game.handleMessage(message);
    const lunarDocs = {
      installing: "https://www.lunarvim.org/01-installing.html",
      stable: "https://www.lunarvim.org/01-installing.html#stable",
      rolling: "https://www.lunarvim.org/01-installing.html#rolling",

      quickstart: "https://www.lunarvim.org/02-after-install.html",
      "general-settings":
        "https://www.lunarvim.org/configuration/01-settings.html",
      "keybindings-keybinds-keymaps-keymappings":
        "https://www.lunarvim.org/configuration/02-keybindings.html",
      "which-key-whichkey":
        "https://www.lunarvim.org/configuration/02-keybindings.html#whichkey-bindings",
      "color-schemes-colorschemes":
        "https://www.lunarvim.org/configuration/03-colorschemes.html",
      "nerd-fonts": "https://www.lunarvim.org/configuration/04-nerd-fonts.html",
      "autocmds-autocommands":
        "https://www.lunarvim.org/configuration/05-autocommands.html",
    };
    Object.keys(lunarDocs).map((query) => {
      if (query.includes(search_query)) {
        const em = new MessageEmbed()
          .setTitle("LunarVim docs search results")
          .setDescription(lunarDocs[query])
          .setColor("RED");

        message.channel.send({ embeds: [em] });
      }
    });
  },
};
