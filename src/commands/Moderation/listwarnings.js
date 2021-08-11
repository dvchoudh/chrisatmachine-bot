//@ts-check
const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const ytsr = require("ytsr");
const { red } = require("../../../config/colors.json");
const warnSchema = require("../../../schemas/warnSchema");
//@ts-check

const mongoose = require("mongoose");
const { setCooldown } = require("../../utils/utils");
const mongoURL = process.env.MONGODB_URI;
/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "warnings",
  category: "Moderation",
  aliases: ["listwarnings"],
  clientPerms: ["SEND_MESSAGES"],

  execute: async function ({ client, message, args }) {
    // @ts-ignore
    const goat = message.mentions.users.first();
    // if (!goat) {
    //   return message.channel.send(`:x: | You need to mention a user to warn!`);
    // }

    const guildId = message.guild.id;
    const userId = message.member.id;

    // const myFile = fs.readFileSync("./Logs/warnings.json");

    // const warnings = JSON.parse(myFile.toString());

    // try {
    //   for (var name in warnings) {
    //     if (name == goat.username) {
    //       return message.channel.send(`This user is warned`);
    //     }
    //   }
    // } catch {
    //   console.log("ERROR");
    // }

    await mongoose.connect(mongoURL).then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          userId,
        });

        for (const warning of results.warnings) {
          // const embed = new MessageEmbed()
          //   .setColor(red)
          //   .setAuthor(
          //     `${warning.user.username}#${warning.user.discriminator} (${warning.user.id})`,
          //     `${warning.user.avatarURL}`
          //   )
          //   .setDescription(
          //     `Warned by ${warning.moderator.username}#${warning.moderator.discriminator} (${warning.moderator.id})`
          //   )
          //   .setTimestamp(warning.time);
          // embed.addField("Reason:", warning.reason);
          // embed.addField("Time:", warning.time);
          // embed.addField(
          //   "Moderator:",
          //   `${warning.moderator.username}#${warning.moderator.discriminator} (${warning.moderator.id})`
          // );
          // embed.addField(
          //   "Guild:",
          //   `${warning.guild.name} (${warning.guild.id})`
          // );
          // embed.addField(
          //   "Channel:",
          //   `${warning.channel.name} (${warning.channel.id})`
          // );
          // embed.addField("Message:", warning.message);

          // embed.addField("Reason:", warnings[goat.username].reason);
          // embed.addField("Time:", warnings[goat.username].time);
          // embed.addField("Moderator:", `${warnings[goat.username].moderator.username}#${warnings[goat.username].moderator.discriminator} (${warnings[goat.username].moderator.id})`);
          // embed.addField("Guild:",
          message.channel.send(results.warnings);
        }

        console.log(results);
        // console.log(warning);

        // // @ts-ignore
        // const { author, timestamp, reason } = await mongoose.model("warnings");

        // const reply = new MessageEmbed()
        //   .setTitle(`Warnings for ${userId}`)
        //   .setColor("RED");

        // const warningsnum = results.length;

        // for (const result of results) {
        //   reply.addField(
        //     `By ${author}, on ${new Date(
        //       timestamp
        //     ).toLocaleDateString()}, for ${reason}`
        //   );

        //   reply.setDescription(result.warning);
        // }
        // reply.addField(
        //   `By ${author}, on ${new Date(
        //     timestamp
        //   ).toLocaleDateString()}, for ${reason}`
        // );

        // message.channel.send(reply);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
// reply.addField(
//   `By ${author}, on ${new Date(
//     timestamp
//   ).toLocaleDateString()}, for ${reason}`
// );
