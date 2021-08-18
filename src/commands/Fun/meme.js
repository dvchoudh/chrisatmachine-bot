const { Permissions, Client, Message, MessageEmbed } = require("discord.js");
const got = require("got");
module.exports = {
  name: "meme",
  description: "Get a fun meme!",
  perms: {
    client: [
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.EMBED_LINKS,
    ],
    user: [Permissions.FLAGS.SEND_MESSAGES],
  },
  aliases: ["memes"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {STring[]} args
   */
  execute: async (client, message, args) => {
    const embed = new MessageEmbed();
    // @ts-ignore
    got("https://www.reddit.com/r/memes/random/.json")
      .then((response) => {
        const [list] = JSON.parse(response.body);
        const [post] = list.data.children;

        const permalink = post.data.permalink;
        const memeUrl = `https://reddit.com${permalink}`;
        const memeImage = post.data.url;
        const memeTitle = post.data.title;
        const memeUpvotes = post.data.ups;
        const memeNumComments = post.data.num_comments;

        embed.setTitle(`${memeTitle}`);
        embed.setURL(`${memeUrl}`);
        embed.setColor("RANDOM");
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

        message.channel.send({ embeds: [embed] });
      })
      .catch(console.error);
  },
};
