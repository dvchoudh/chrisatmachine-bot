//@ts-check
const { MessageEmbed } = require("discord.js");
const ytsr = require("ytsr");
const { red } = require("../../../config/colors.json");
const warnSchema = require("../../../schemas/warnSchema");
//@ts-check

const fs = require("fs");

const mongoose = require("mongoose");
const { setCooldown } = require("../../utils/utils");
const mongoURL = process.env.MONGODB_URI;
/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "t",
  category: "Moderation",
  aliases: ["geegee"],
  clientPerms: ["MANAGE_MESSAGES"],

  execute: async function ({ client, message, args }) {
    // @ts-ignore
    const goat = message.mentions.users.first();
    if (!goat) {
      return message.channel.send(`:x: | You need to mention a user to warn!`);
    }

    const guildId = message.guild.id;
    const userId = goat.id;
    const reason = args.slice(1).join(" ");

    const warning = {
      author: message.member.user.tag,
      timestap: new Date().getTime(),
      reason,
    };

    const warningData = {
      name: goat.username,
      userId: userId,
      reason: reason,
    };

    mongoose.connect(mongoURL).then(async (mongoose) => {
      try {
        console.log("hi");
        warnSchema.updateOne({ Guild: message.guild.id }, async (err, data) => {
          new warnSchema({
            guildId,
            userId,
            warnings: [warning],
            reason,
          }).save();
          message.channel.send(`Warned`);
        });
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
