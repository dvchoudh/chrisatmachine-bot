const { Client, MessageEmbed } = require("discord.js");

/**
 *
 * @param {Client} client
 * @param {NoIdea} payload
 */

module.exports = async (client, payload, user) => {
	const content = await payload.message.content
	const emoji = await payload.emoji.name
	const author = await payload.message.author

	if (content) {
		if ("🔖📑".includes(emoji)) {
			const em = new MessageEmbed()
				.setDescription(`
				**From: <@${author.id}> **

				${content}
				`)
				.setColor("RED")
			await user.send({embeds: [em]})
		}
	}
};
