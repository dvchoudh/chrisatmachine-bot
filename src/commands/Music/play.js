//@ts-check

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "play",
  aliases: ["start"],
  category: "Music",
  description: "Play music",
  cooldown: 5,
  globalCooldown: true,
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
    if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel!`);
    
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel!`);

    if (!args[0]) return message.channel.send(`Please indicate the title of a song!`);

    client.player.play(message, args.join(" "), true);
  },
};
