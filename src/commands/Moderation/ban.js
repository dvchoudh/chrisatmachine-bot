const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban a user [ MODERATOR ONLY ]",
  perms: {
    client: [
      Permissions.FLAGS.SEND_MESSAGES,
      Permissions.FLAGS.VIEW_CHANNEL,
      Permissions.FLAGS.EMBED_LINKS,
      Permissions.FLAGS.BAN_MEMBERS,
    ],
    user: [Permissions.FLAGS.BAN_MEMBERS],
  },
  aliases: [],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {STring[]} args
   */
  execute: async (client, message, args) => {
    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please specify a member for me to kick them");
    // @ts-ignore
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No Reason Given";
    if (!member.bannable) {
      const errorEmbed = new MessageEmbed()
        .setDescription(`This member cannot be banned`)
        .setColor("RED");
      return message.channel.send({ embeds: [errorEmbed] });
    }
    try {
      const sembed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          `**You Have Been Banned From ${message.guild.name} for - ${
            reason || "No Reason!"
          }**`
        )
        .setFooter(message.guild.name, message.guild.iconURL());
      member
        .send({ embeds: [sembed2] })
        // @ts-ignore
        .then(() => member.ban())
        .catch(() => null);
    } catch {
      // @ts-ignore
      member.ban();
    }

    if (reason) {
      var sembed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `**${member.user.username}** has been banned for ${reason}`
        );
      message.channel.send({ embeds: [sembed] });
    } else {
      var sembed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `**${member.user.username}** has been banned for ${reason}`
        );
      message.channel.send({ embeds: [sembed2] });
    }
  },
};
