const { Permissions, Client, Message, MessageEmbed } = require("discord.js");
const ytsr = require('ytsr');

module.exports = {
	name: "youtube",
	description: "Search for youtube videos.",
	perms: {
		client: [
			Permissions.FLAGS.SEND_MESSAGES,
			Permissions.FLAGS.VIEW_CHANNEL,
			Permissions.FLAGS.EMBED_LINKS,
		],
		user: [Permissions.FLAGS.SEND_MESSAGES],
	},
	aliases: ["yt", "search", "ytsearch"],

	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	execute: async (client, message, args) => {
		const query = args.join(" ");

		const results = await ytsr(query, { limit: 1 });
		const items = results['items']
		if (items.length) {
			await message.channel.send(items[0]['url'])
		} else {
			await message.channel.send({
				embeds: [
					new MessageEmbed()
						.setDescription("Sorry couldnt find a video related to that query.")
						.setColor("RED")
				]
			})
		}
	},
};
