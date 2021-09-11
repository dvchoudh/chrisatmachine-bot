const { Client, MessageEmbed } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {NoIdea} payload
 */

module.exports = async (client, payload) => {
	const content = await payload.message.content
	const emoji = await payload.emoji.name
	const author = await payload.message.author

	if (content) {
		if ("🔖📑".includes(emoji)) {
			const em = new MessageEmbed()
				.setDescription(content)
				.setColor("RED")
			await author.send({embeds: [em]})
		}
	}
};
