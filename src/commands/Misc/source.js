//@ts-check

const { setCooldown } = require("../../utils/utils");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "source",
  category: "Misc",
  aliases: [],
  
  clientPerms: ["SEND_MESSAGES"],

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    const msg = args.join(" ");
    message.channel.send(msg);
  },
};
