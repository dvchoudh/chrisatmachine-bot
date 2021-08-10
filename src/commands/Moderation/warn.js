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
  name: "warn",
  category: "Moderation",
  aliases: ["w"],
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

    // const customer = {
    //   name: "Newbie Co.",
    //   order_count: 0,
    //   address: "Po Box City",
    // };
    // const jsonString = JSON.stringify(customer);
    // try {
    //   fs.writeFile("asdasdjson", jsonString, (err) => {
    //     if (err) {
    //       console.log("Error writing file", err);
    //     } else {
    //       console.log("Successfully wrote file");
    //     }
    //   });
    //   message.channel.send(`:white_check_mark: | Successfully warned user!`);
    // } catch (err) {
    //   console.log("Error writing file", err);
    // }
    const warningData = {
      name: goat.username,
      userId: userId,
      reason: reason,
    };

    var data = fs.readFileSync("./Logs/warnings.json");
    var myObject = JSON.parse(data.toString());

    myObject.push(warningData);

    var newData = JSON.stringify(myObject);

    fs.writeFile("./Logs/warnings.json", newData, (err) => {
      // error checking
      if (err) throw err;

      console.log("New data added");
    });
    // const jsonString = JSON.stringify(warningData);
    // const fs = require("fs");
    // fs.appendFile("./Logs/warnings.json", jsonString, (err) => {
    //   if (err) {
    //     console.log("Error writing file", err);
    //   }
    // });
    // console.log(jsonString);

    // jsonString.({
    //   //add the employee
    //   firstName: "Mike",
    //   lastName: "Rut",
    //   time: "10:00 am",
    //   email: "rut@bah.com",
    //   phone: "800-888-8888",
    //   image: "images/mike.jpg",
    // });
    // txt = JSON.stringify(data);
    // await mongoose.connect(mongoURL).then(async (mongoose) => {
    //   try {
    //     await warnSchema.findOneAndUpdate(
    //       { Guild: message.guild.id },
    //       async (err, data) => {
    //         if (data) data.delete();
    //         new warnSchema({
    //           guildId,
    //           userId,
    //           warnings: [warning],
    //         }).save();
    //         message.channel.send(`Warned`);
    //       }
    //     );
    //   } finally {
    //     mongoose.connection.close();
    //   }
    // });

    // warnSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
    //   if (data) data.delete();
    //   new warnSchema({
    //     guildId,
    //     userId,
    //     warnings: [warning],
    //   }).save();
    //   message.channel.send(`Warned`);
    // });
  },
};
