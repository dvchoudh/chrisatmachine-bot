const { Schema, model } = require("mongoose");

const warnSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  warnings: {
    type: [Object],
  },
});

module.exports = model("warnings", warnSchema);
