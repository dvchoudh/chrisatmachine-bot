const { setCooldown } = require("../../utils/utils");

const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe({ language: "en" });
/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "ttt",
  category: "Fun",
  aliases: ["tictactoe-ai", "tictactoe", "ttt"],
  clientPerms: ["SEND_MESSAGES"],

  execute: async function ({ client, message, args }) {
    setCooldown(client, this, message);
    game.handleMessage(message);
  },
};
