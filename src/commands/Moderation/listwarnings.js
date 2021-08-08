//@ts-check
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

    await mongoose.connect(mongoURL).then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          userId,
          warning,
        });

        if (typeof results === "undefined") {
          return message.channel.send(`:x: | Undefined var`);
        }

        const reply = new MessageEmbed()
          .setTitle(`Warnings for ${userId}`)
          .setColor("RED");

        console.log(results);
        // for (const warning of results.warnings) {
        //   // @ts-ignore
        //   // const { author, timestamp, reason } = warning;
        //   // reply.addField(
        //   //   `By ${author}, on ${new Date(
        //   //     timestamp
        //   //   ).toLocaleDateString()}, for ${reason}`
        //   // );
        //   console.log(warning);
        // }

        // message.channel.send(reply);
      } finally {
        // mongoose.connection.close();
      }
    });

    warnSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) data.delete();
      new warnSchema({
        guildId,
        userId,
        warnings: [warning],
      }).save();
      message.channel.send(`Warned`);
    });
  },
};
