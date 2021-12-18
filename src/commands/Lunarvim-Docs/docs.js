const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

// TODO: need to add categories: languages, extra-plugins
const lunarDocs = {
	// Mostly installation
	"lunarvim-github": "https://github.com/LunarVim/LunarVim",
	"installing-uninstalling": "https://www.lunarvim.org/01-installing.html#uninstall",
	"install-stable": "https://www.lunarvim.org/01-installing.html#stable",
	"install-rolling": "https://www.lunarvim.org/01-installing.html#rolling",
	"troubleshooting-install-problems-installation-problems-troubleshoots": "https://www.lunarvim.org/01-installing.html#troubleshooting-installation-problems",
	"add-to-path-add-path-add-lvim-to-path": "https://www.lunarvim.org/02-after-install.html#add-lvim-to-path",

	// General Config
	"configuration": "https://www.lunarvim.org/configuration/",
	"quickstart-after-install-quick-start": "https://www.lunarvim.org/02-after-install.html",
	"general-settings-options": "https://www.lunarvim.org/configuration/01-settings.html",
	"general-keybinds-general-keybindings-keymappings": "https://www.lunarvim.org/configuration/02-keybindings.html#general-bindings",
	"which-key-whichkey": "https://www.lunarvim.org/configuration/02-keybindings.html#whichkey-bindings",
	"autocmds-autocommands": "https://www.lunarvim.org/configuration/05-autocommands.html",
	"color-schemes-colorschemes": "https://www.lunarvim.org/configuration/03-colorschemes.html",
	"statusline-lualine-galaxyline-feline": "https://www.lunarvim.org/configuration/06-statusline.html",
	"nerd-fonts": "https://www.lunarvim.org/configuration/04-nerd-fonts.html",
	"transparent-windows-blur-opacity": "https://www.lunarvim.org/configuration/03-colorschemes.html#transparent-windows",
	"leader-key-leaderkey-space-leader": "https://www.lunarvim.org/configuration/02-keybindings.html#leader-key",

	// Languagse stuffs
	"lsp-support-language-server-protocol-lspinstall-lsp-install-lsp": "https://www.lunarvim.org/languages/#lsp-support",
	"lsp-plugins-lsp-related-plugins": "https://www.lunarvim.org/plugins/02-default-plugins.html#language-server-protocol",
	"formatters-formatting": "https://www.lunarvim.org/languages/#formatting",
	"linting-linters": "https://www.lunarvim.org/languages/#linting",
	"langs-languages-php-svelte-react": "https://www.lunarvim.org/languages/",
	// Langs
	"c-lang-c-clangd-cpp-lang-cpp-c++-lang-c++": "https://www.lunarvim.org/languages/c_cpp.html",
	"c-sharp-c-hash-c-pound": "https://www.lunarvim.org/languages/csharp.html#c-csharp",
	"go-lang-go-golang": "https://www.lunarvim.org/languages/go.html",
	"java-lang-java": "https://www.lunarvim.org/languages/java.html",
	"javascript-lang-javascript-js-lang-js": "https://www.lunarvim.org/languages/javascript.html",
	"json-lang-json": "https://www.lunarvim.org/languages/json.html",
	"julia-lang-julia": "https://www.lunarvim.org/languages/julia.html",
	"lua-lang-lua": "https://www.lunarvim.org/languages/lua.html#lua",
	"ps-lang-ps-powershell-lang-powershell": "https://www.lunarvim.org/languages/powershell.html",
	"python-lang-python-py-lang-py-python3-lang-python3": "https://www.lunarvim.org/languages/python.html",
	"qml-lang-qml": "https://www.lunarvim.org/languages/qml.html#qml",
	"ruby-lang-ruby": "https://www.lunarvim.org/languages/ruby.html",
	"rust-lang-rust": "https://www.lunarvim.org/languages/rust.html",
	"scala-lang-scala": "https://www.lunarvim.org/languages/scala.html",
	"typescript-lang-typescript-ts-lang-ts": "https://www.lunarvim.org/languages/typescript.html",
	"vue-lang-vue": "https://www.lunarvim.org/languages/vue.html",

	// PLUGINS
	"core-plugins-nvim-tree-nvimtree-nvim_tree-dashboard-bufferline-terminal-toggleterm-compe-cmp": "https://www.lunarvim.org/plugins/#core-plugins",
	"install-plugins-pluginstall-installing-plugins-add-plugins": "https://www.lunarvim.org/plugins/01-installing.html#example",
	"remove-plugins-delete-plugins-plugin-delete-uninstall-plugin": "https://www.lunarvim.org/plugins/01-installing.html#removing-plugins",
	"packer.nvim-manage-plugins": "https://www.lunarvim.org/plugins/02-default-plugins.html#plugin-management",

	// Default Plugins
	"treesitter-lang-parser-tree-sitter": "https://www.lunarvim.org/plugins/02-default-plugins.html#language-parser",
	"treesitter-tree-sitter": "https://www.lunarvim.org/plugins/02-extra-plugins.html#treesitter",
	"commentary-kommentary-commenting-nvim-ts-commentstring": "https://www.lunarvim.org/plugins/02-default-plugins.html#comments",
	"nvim-tree-nvim_tree-file-explorer-nerdtree": "https://www.lunarvim.org/plugins/02-default-plugins.html#file-explorer",
	"nvim-telescope.nvim-fuzzy-search-fuzzy-finding": "https://www.lunarvim.org/plugins/03-extra-plugins.html#telescope-fzy-native-nvim",
	"nvim-cmp-compe-tabnine": "https://www.lunarvim.org/plugins/02-default-plugins.html#completion",
	"friendly-snippets-luasnips-ultisnips": "https://www.lunarvim.org/plugins/02-default-plugins.html#snippets",
	"gitsigns-git-signs-integration": "https://www.lunarvim.org/plugins/02-default-plugins.html#git",
	"terminal-toggleterm-floaterm": "https://www.lunarvim.org/plugins/02-default-plugins.html#terminal",
	"debugging-dapinstall-dap-install": "https://www.lunarvim.org/plugins/02-default-plugins.html#debugging",

	"vim-fugitive": "https://www.lunarvim.org/plugins/03-extra-plugins.html#vim-fugitive",
	"trouble-folke": "https://www.lunarvim.org/plugins/03-extra-plugins.html#trouble-nvim",
	"indent-blanklines-indent-guides": "https://www.lunarvim.org/plugins/03-extra-plugins.html#indent-blankline",
	"minimap-plugin-minimap": "https://www.lunarvim.org/plugins/03-extra-plugins.html#minimap",
	"ranger-plugin-ranger-rnvimr": "https://www.lunarvim.org/plugins/03-extra-plugins.html#rnvimr",
	"git-diffview.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#diffview",
	"octo-nvim-git": "https://www.lunarvim.org/plugins/03-extra-plugins.html#octo",
	"nvim-ts-rainbow-treesitter-rainbow": "https://www.lunarvim.org/plugins/03-extra-plugins.html#nvim-ts-rainbow",
	"nvim-treesitter-playground": "https://www.lunarvim.org/plugins/03-extra-plugins.html#playground",
	"autosave.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#autosave",
	"markdown-preview-markdownpreview.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#markdown-preview-nvim",
	"neoscroll.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#neoscroll",
	"nvim-ts-autotag-treesitter-autotag": "https://www.lunarvim.org/plugins/03-extra-plugins.html#nvim-ts-autotag",
	"todo-comments-folke": "https://www.lunarvim.org/plugins/03-extra-plugins.html#todo-comments-nvim",
	"folke-lsp-colors": "https://www.lunarvim.org/plugins/03-extra-plugins.html#lsp-colors",
	"persistence-folke": "https://www.lunarvim.org/plugins/03-extra-plugins.html#persistence",
	"bracey-liveserver-live-server": "https://www.lunarvim.org/plugins/03-extra-plugins.html#bracey",
	"plugin-hop.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#hop",
	"lightspeed.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#lightspeed",
	"numb.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#numb",
	"nvim-spectre.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#nvim-spectre",
	"git-blame.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#git-blame",
	"git-linker.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#gitlinker",
	"nvim-ts-playground.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#playground",
	"lush.nvim-colors": "https://www.lunarvim.org/plugins/03-extra-plugins.html#lush-nvim",
	"lsp-rooter.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#lsp-rooter",
	"lsp-signature.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#lsp-signature-nvim",
	"symbols-outline.nvim": "https://www.lunarvim.org/plugins/03-extra-plugins.html#symbols-outline-nvim",
	"nvim-lastplace.nvim-last-place": "https://www.lunarvim.org/plugins/03-extra-plugins.html#symbols-outline-nvim",
	"nvim-cursor-word-cursorword-cusor-word-highlight": "https://www.lunarvim.org/plugins/03-extra-plugins.html#vim-cursorword",
	"null-ls-nullls": "https://www.lunarvim.org/community/faq.html#what-is-null-ls-and-why-do-you-use-it",
	"go-to-preview.nvim-goto-preview": "https://www.lunarvim.org/plugins/03-extra-plugins.html#goto-preview",
	"vim-surround": "https://www.lunarvim.org/plugins/03-extra-plugins.html#vim-surround",

	"style-guide-styling": "https://www.lunarvim.org/dev/#style-guide",
	"lvim-development-lunarvim": "https://www.lunarvim.org/dev/#development-of-lunarvim",
	"lvinfo-lunarvim-info-lunarinfo": "https://www.lunarvim.org/languages/#at-a-glance",
	"faqs-frequently-asked-questions": "https://www.lunarvim.org/community/faq.html",
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
	execute: async (_, message, args) => {
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
