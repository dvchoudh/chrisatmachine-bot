const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

// TODO: need to add categories: languages, extra-plugins
const lunarDocs = {
	"lunarvim-github": "https://github.com/LunarVim/LunarVim",
	"installing-uninstalling": "https://www.lunarvim.org/01-installing.html#uninstall",
	"stable": "https://www.lunarvim.org/01-installing.html#stable",
	"rolling": "https://www.lunarvim.org/01-installing.html#rolling",

	"configuration": "https://www.lunarvim.org/configuration/",
	"nerd-fonts": "https://www.lunarvim.org/configuration/04-nerd-fonts.html",
	"which-key-whichkey": "https://www.lunarvim.org/configuration/02-keybindings.html#whichkey-bindings",

	"quickstart-after-install": "https://www.lunarvim.org/02-after-install.html",
	"general-settings-options": "https://www.lunarvim.org/configuration/01-settings.html",
	"keybindings-keybinds-keymaps-keymappings": "https://www.lunarvim.org/configuration/02-keybindings.html",
	"autocmds-autocommands": "https://www.lunarvim.org/configuration/05-autocommands.html",
	"color-schemes-colorschemes": "https://www.lunarvim.org/configuration/03-colorschemes.html",
	"statusline-lualine-galaxyline": "https://www.lunarvim.org/configuration/06-statusline.html",

	"general-keybinds-general-keybindings-keymappings": "https://www.lunarvim.org/configuration/02-keybindings.html#general-bindings",
	"leader-key-leaderkey-space-leader": "https://www.lunarvim.org/configuration/02-keybindings.html#leader-key",
	"transparent-windows-blur-opacity": "https://www.lunarvim.org/configuration/03-colorschemes.html#transparent-windows",

	"core-nvim-tree-nvimtree-nvim_tree-plugins-dashboard-bufferline-terminal-toggleterm-dap-compe-cmp": "https://www.lunarvim.org/plugins/#core-plugins",
	"install-plugins-pluginstall-installing-plugins-add-plugins": "https://www.lunarvim.org/plugins/01-installing.html#example",
	"remove-plugins-delete-plugins-plugin-delete": "https://www.lunarvim.org/plugins/01-installing.html#removing-plugins",
	"style-guide-styling": "https://www.lunarvim.org/dev/#style-guide",
	"treesitter-tree-sitter": "https://www.lunarvim.org/plugins/02-extra-plugins.html#treesitter",

	"langs-languages-php-lua-csharp-svelte-react-typescript-julia-powershell": "https://www.lunarvim.org/languages/",
	"lvinfo-lunarvim-info-lunarinfo": "https://www.lunarvim.org/languages/#lunarvim-info",
	"install-lsp-lspinstall": "https://www.lunarvim.org/languages/#lsp",
	"formatter-formatting": "https://www.lunarvim.org/languages/#formatting",
	"linting-linter": "https://www.lunarvim.org/languages/#linting",
	"faqs-frequently-asked-questions": "https://www.lunarvim.org/community/faq.html",

	// PLUGINS
	"vim-fugitive": "https://www.lunarvim.org/plugins/02-extra-plugins.html#vim-fugitive",
	"trouble-folke": "https://www.lunarvim.org/plugins/02-extra-plugins.html#trouble-nvim",
	"indent-blanklines-indent-guides": "https://www.lunarvim.org/plugins/02-extra-plugins.html#indent-blankline",
	"compe-cmp-tabnine": "https://www.lunarvim.org/plugins/02-extra-plugins.html#compe-tabnine",
	"nvim-telescope.nvim-fuzzy-search-fuzzy-finding": "https://www.lunarvim.org/plugins/02-extra-plugins.html#telescope-fzy-native-nvim",
	"minimap-plugin-minimap": "https://www.lunarvim.org/plugins/02-extra-plugins.html#minimap",
	"ranger-plugin-ranger-rnvimr": "https://www.lunarvim.org/plugins/02-extra-plugins.html#rnvimr",
	"git-diffview.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#diffview",
	"octo-nvim-git": "https://www.lunarvim.org/plugins/02-extra-plugins.html#octo",
	"nvim-ts-rainbow-treesitter-rainbow": "https://www.lunarvim.org/plugins/02-extra-plugins.html#nvim-ts-rainbow",
	"autosave.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#autosave",
	"markdown-preview-markdownpreview.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#markdown-preview-nvim",
	"neoscroll.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#neoscroll",
	"nvim-ts-autotag-treesitter-autotag": "https://www.lunarvim.org/plugins/02-extra-plugins.html#nvim-ts-autotag",
	"commentary-kommentary-commenting-nvim-ts-commentstring": "https://www.lunarvim.org/plugins/02-extra-plugins.html#nvim-ts-context-commentstring",
	"todo-comments-folke": "https://www.lunarvim.org/plugins/02-extra-plugins.html#todo-comments-nvim",
	"folke-lsp-colors": "https://www.lunarvim.org/plugins/02-extra-plugins.html#lsp-colors",
	"persistence-folke": "https://www.lunarvim.org/plugins/02-extra-plugins.html#persistence",
	"bracey-liveserver-live-server": "https://www.lunarvim.org/plugins/02-extra-plugins.html#bracey",
	"plugin-hop.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#hop",
	"lightspeed.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#lightspeed",
	"numb.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#numb",
	"nvim-spectre.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#nvim-spectre",
	"git-blame.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#git-blame",
	"git-linker.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#gitlinker",
	"nvim-ts-playground.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#playground",
	"lush.nvim-colors": "https://www.lunarvim.org/plugins/02-extra-plugins.html#lush-nvim",
	"lsp-rooter.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#lsp-rooter",
	"lsp-signature.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#lsp-signature-nvim",
	"symbols-outline.nvim": "https://www.lunarvim.org/plugins/02-extra-plugins.html#symbols-outline-nvim",
	"nvim-lastplace.nvim-last-place": "https://www.lunarvim.org/plugins/02-extra-plugins.html#symbols-outline-nvim",
	"nvim-cursor-word-cursorword-cusor-word-highlight": "https://www.lunarvim.org/plugins/02-extra-plugins.html#vim-cursorword",
	"null-ls-nullls": "https://www.lunarvim.org/community/faq.html#what-is-null-ls-and-why-do-you-use-it",
	"go-to-preview.nvim-goto-preview": "https://www.lunarvim.org/plugins/02-extra-plugins.html#goto-preview",
	"vim-surround": "https://www.lunarvim.org/plugins/02-extra-plugins.html#vim-surround",

	// Langs
	"c-lang-c-clangd-cpp-lang-cpp-c++-lang-c++": "https://www.lunarvim.org/languages/c_cpp.html#c-c",
	"go-lang-go-golang": "https://www.lunarvim.org/languages/go.html#go",
	"java-lang-java": "https://www.lunarvim.org/languages/java.html#java",
	"javascript-lang-javascript-js-lang-js": "https://www.lunarvim.org/languages/javascript.html#javascript",
	"json-lang-json": "https://www.lunarvim.org/languages/json.html#json",
	"julia-lang-julia": "https://www.lunarvim.org/languages/julia.html#julia",
	"ps-lang-ps-powershell-lang-powershell": "https://www.lunarvim.org/languages/powershell.html#powershell",
	"python-lang-python-py-lang-py-python3-lang-python3": "https://www.lunarvim.org/languages/python.html#python",
	"ruby-lang-ruby": "https://www.lunarvim.org/languages/ruby.html#ruby",
	"rust-lang-rust": "https://www.lunarvim.org/languages/rust.html#rust",
	"scala-lang-scala": "https://www.lunarvim.org/languages/scala.html#scala",
	"typescript-lang-typescript-ts-lang-ts": "https://www.lunarvim.org/languages/typescript.html#typescript",
	"vue-lang-vue": "https://www.lunarvim.org/languages/vue.html#vue"
};

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
		if (!args.length) return
		if (search_query.length <= 2) {
			const notEnough = new MessageEmbed()
				.setDescription("Argument length too small!")
				.setColor("RED");
			message.channel.send({ embeds: [notEnough] });

			return
		}

		let count = 0;
		Object.keys(lunarDocs).map((query) => {
			if (query.includes(search_query)) {
				count++;
				const em = new MessageEmbed()
					.setDescription(lunarDocs[query])
					.setColor("RED");

				message.channel.send({ embeds: [em] });
			}
		});
		if (count <= 0) {
			const failed = new MessageEmbed()
				.setDescription(`Couldn't get docs for ${search_query}`)
				.setColor("RED");
			message.channel.send({ embeds: [failed] })
		}
	},
};
