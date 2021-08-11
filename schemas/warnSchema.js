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

  reason: {
    type: String,
  },
});

module.exports = model("warnings", warnSchema);
