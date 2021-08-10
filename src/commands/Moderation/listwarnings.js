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
    const reason = args.slice(1).join(" ");

    const warning = {
      author: message.member.user.tag,
      timestap: new Date().getTime(),
      reason,
    };

    const myFile = fs.readFileSync("./Logs/warnings.json");

    const warnings = JSON.parse(myFile.toString());

    try {
      for (var name in warnings) {
        if (name == goat.username) {
          return message.channel.send(`This user is warned`);
        }
      }
    } catch {
      console.log("ERROR");
    }

    // await mongoose.connect(mongoURL).then(async (mongoose) => {
    //   try {
    //     const results = await warnSchema.find({
    //       guildId,
    //       userId,
    //       warning,
    //     });
    //     // console.log(warning);

    //     const reply = new MessageEmbed()
    //       .setTitle(`Warnings for ${userId}`)
    //       .setColor("RED");

    //     const warningsnum = results.length;

    //     for (const result of results) {
    //       console.log(result);
    //     }

    //     message.channel.send(reply);
    //   } finally {
    //     // mongoose.connection.close();
    //   }
    // });
  },
};
// reply.addField(
//   `By ${author}, on ${new Date(
//     timestamp
//   ).toLocaleDateString()}, for ${reason}`
// );
