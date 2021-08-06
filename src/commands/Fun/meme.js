//@ts-check

const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const sourcebin = require("sourcebin");
const got = require("got");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "meme",
  aliases: ["memes"],
  category: "Fun",
  description: "Memes!",
  cooldown: 10,
  globalCooldown: false,
  canNotDisable: false,
  canNotSetCooldown: false,
  canNotAddAlias: false,
  hideCommand: false,
  perms: [],
  clientPerms: [],
  devOnly: false,
  someServersOnly: false,
  serverOwnerOnly: false,
  nsfw: false,
  arguments: [],

  execute: async function ({ client, message, args, flags }) {
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

        message.channel.send(embed);
      })
      .catch(console.error);
  },
};
