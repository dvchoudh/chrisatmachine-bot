//@ts-check

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "stop",
  aliases: [""],
  category: "Music",
  description: "Stop the music",
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

    if (!client.player.getQueue(message)) return message.channel.send(`There is no music currently playing!`);

    client.player.setRepeatMode(message, false);
    const success = client.player.stop(message);

    if (success) message.channel.send(`I have **stopped** playing music in this server!`);
  },
};
