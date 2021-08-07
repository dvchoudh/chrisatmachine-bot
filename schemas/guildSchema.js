require("dotenv").config();
const { Schema, model } = require("mongoose");

const guildSchema = Schema({
  _id: String,
  prefix: {
    default: process.env.PREFIX,
    type: String,
  },
  disabledCommands: Array,
  disabledChannels: Array,
  commandPerms: {},
  commandCooldowns: {},
  commandAlias: {},
});

module.exports = model("guildSchema", guildSchema);
