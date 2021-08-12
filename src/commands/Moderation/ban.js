//@ts-check
const { setCooldown } = require("../../utils/utils");
const { MessageEmbed, Permissions } = require("discord.js");
/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "hardban",
  category: "Moderation",
  aliases: ["hban", "permban", "ban"],
  clientPerms: ["ADMINISTRATOR"],

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    //     if (!message.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS])) {
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
    // @ts-ignore
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No Reason Given";
    if (!member.bannable) {
      const errorEmbed = new MessageEmbed()
        .setDescription(`This member cannot be banned`)
        .setColor("RED");
      return message.channel.send({embeds: [errorEmbed]});
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
        .send({embeds: [sembed2]})
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
      message.channel.send(sembed);
    } else {
      var sembed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `**${member.user.username}** has been banned for ${reason}`
        );
      message.channel.send(sembed2);
    }
    // member.kick(reason).catch((err) => console.log(err));
  },
};
