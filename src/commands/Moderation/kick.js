//@ts-check
const { setCooldown } = require("../../utils/utils");
const { MessageEmbed, Permissions } = require("discord.js");
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
    // if (!message.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS])) {
    //   const errorEmbed = new MessageEmbed()
    //     .setDescription(
    //       `${message.author}, You do not have permission to run this command!`
    //     )
    //     .setColor("RED");
    //   return message.channel.send({embeds: [errorEmbed]});
    // }
    let member = message.mentions.members.first();
    if (!member)
      return message.reply("Please specify a member for me to kick them");
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No Reason Given";
    if (!member.kickable) {
      const errorEmbed = new MessageEmbed()
        .setDescription(`This member cannot be kicked`)
        .setColor("RED");
      return message.channel.send({embeds: [errorEmbed]});
    }
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
        .send({embeds: [sembed2]})
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
      message.channel.send({embeds: [sembed]});
    } else {
      var sembed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**${member.user.username}** has been kicked`);
      message.channel.send({embeds: [sembed2]});
    }
    // member.kick(reason).catch((err) => console.log(err));
  },
};
