//@ts-check

const { setCooldown } = require("../../utils/utils");
const { MessageEmbed } = require("discord.js");
/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "kick",
  category: "Moderation",
  aliases: ["kickmembers"],
  clientPerms: ["KICK_MEMBERS"],

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return message.channel.send(
        "You do not have permission to kick a member!"
      );
    }
    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please specify a member for me to kick them");
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No Reason Given";
    if (!member.kickable) return message.reply("This member is not kickable");
    try {
      const sembed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          `**You Have Been Kicked From ${message.guild.name} for - ${
            reason || "No Reason!"
          }**`
        )
        .setFooter(message.guild.name, message.guild.iconURL());
      member
        .send(sembed2)
        .then(() => member.kick())
        .catch(() => null);
    } catch {
      member.kick();
    }

    if (reason) {
      var sembed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `**${member.user.username}** has been kicked for ${reason}`
        );
      message.channel.send(sembed);
    } else {
      var sembed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**${member.user.username}** has been kicked`);
      message.channel.send(sembed2);
    }
    // member.kick(reason).catch((err) => console.log(err));
  },
};
