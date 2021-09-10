const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

/**
*
* @param {Client} client
* @param {Message} message
* @param {STring[]} args
*/
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
	aliases: ["docs", "doc", "documentation", "rtfm"],

	/**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
	*/
	execute: async (client, message, args) => {
		const search_query = args.join("-");
		// const args2 = args[1];

		// TODO: need to add categories: languages, extra-plugins
		const lunarDocs = {
			"lunarvim-github": "https://github.com/LunarVim/LunarVim",
			"installing-uninstalling": "https://www.lunarvim.org/01-installing.html",
			"stable": "https://www.lunarvim.org/01-installing.html#stable",
			"rolling": "https://www.lunarvim.org/01-installing.html#rolling",

			"configuration": "https://www.lunarvim.org/configuration/",
			"nerd-fonts": "https://www.lunarvim.org/configuration/04-nerd-fonts.html",
			"which-key-whichkey": "https://www.lunarvim.org/configuration/02-keybindings.html#whichkey-bindings",

			"quickstart-after-install": "https://www.lunarvim.org/02-after-install.html",
			"general-settings": "https://www.lunarvim.org/configuration/01-settings.html",
			"keybindings-keybinds-keymaps-keymappings": "https://www.lunarvim.org/configuration/02-keybindings.html",
			"autocmds-autocommands": "https://www.lunarvim.org/configuration/05-autocommands.html",
			"color-schemes-colorschemes": "https://www.lunarvim.org/configuration/03-colorschemes.html",
			"statusline-lualine-galaxyline": "https://www.lunarvim.org/configuration/06-statusline.html",

			"core-plugins-dashboard-bufferline-terminal-toggleterm": "https://www.lunarvim.org/plugins/#core-plugins",
			"install-plugins": "https://www.lunarvim.org/plugins/01-installing.html#example",
			"remove-plugins-delete-plugins": "https://www.lunarvim.org/plugins/01-installing.html#removing-plugins",
			"style-guide": "https://www.lunarvim.org/dev/#style-guide",

			"langs-cpp-javascript-php-python-rust-ruby-lua": "https://www.lunarvim.org/languages/",
			"lvinfo-lunarvim-info": "https://www.lunarvim.org/languages/#lunarvim-info",
			"install-lsp-lspinstall": "https://www.lunarvim.org/languages/#lsp",
			"formatter-formatting": "https://www.lunarvim.org/languages/#formatting",
			"linting": "https://www.lunarvim.org/languages/#linting",

			"nice-noice-bruh-sus": "[LMAO loser](https://www.youtube.com/watch?v=dQw4w9WgXcQ)",

			// PLUGINS
			"vim-fugitive": "https://www.lunarvim.org/plugins/02-extra-plugins.html#vim-fugitive",
			"trouble": "https://www.lunarvim.org/plugins/02-extra-plugins.html#trouble-nvim",
			"indent-blanklines": "https://www.lunarvim.org/plugins/02-extra-plugins.html#indent-blankline",
			"compe-cmp-tabnine": "https://www.lunarvim.org/plugins/02-extra-plugins.html#compe-tabnine",
			"telescope": "https://www.lunarvim.org/plugins/02-extra-plugins.html#telescope-fzy-native-nvim",
			"minimap-plugin-minimap": "https://www.lunarvim.org/plugins/02-extra-plugins.html#minimap",
			"ranger-plugin-ranger": "https://www.lunarvim.org/plugins/02-extra-plugins.html#rnvimr",
			"git-diffview": "https://www.lunarvim.org/plugins/02-extra-plugins.html#diffview",
			"octo-nvim-git": "https://www.lunarvim.org/plugins/02-extra-plugins.html#octo",
			"nvim-ts-rainbow": "https://www.lunarvim.org/plugins/02-extra-plugins.html#nvim-ts-rainbow",
			"autosave": "https://www.lunarvim.org/plugins/02-extra-plugins.html#autosave",
			"markdown-preview-markdownpreview": "https://www.lunarvim.org/plugins/02-extra-plugins.html#markdown-preview-nvim",
			"neoscroll": "https://www.lunarvim.org/plugins/02-extra-plugins.html#neoscroll"

		};

		let count = 0;
		Object.keys(lunarDocs).map((query) => {
			if (query.includes(search_query)) {
				count++;
				const em = new MessageEmbed()
					// .setTitle("LunarVim docs search results")
					.setDescription(lunarDocs[query])
					.setColor("RED");

				message.channel.send({ embeds: [em] });
			}
		});
		if (count <=0) {
			const failed = new MessageEmbed()
				.setDescription(`Couldn't get docs for ${search_query}`)
				.setColor("RED");
			message.channel.send({embeds: [failed]})
		}
	},
};
