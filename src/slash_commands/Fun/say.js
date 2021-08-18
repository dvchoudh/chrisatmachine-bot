const { CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "say",
  description: "To say or repeat something you say.",
  options: [
    {
      name: "message",
      required: true,
      type: "STRING",
      description: "The message content.",
    },
    {
      name: "channel",
      required: false,
      type: "CHANNEL",
      description: "The message channel.",
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  execute: async (client, interaction) => {
    const msg = interaction.options.data[0].value;
    if (interaction.options.data[1]) {
      await interaction
        .deferReply({
          ephemeral: true,
        })
        .catch(() => {});
      const channel = interaction.guild.channels.cache.get(
        interaction.options.data[1].channel.id
      );
      if (!channel)
        return interaction.followUp({
          content: `Unable to find the given channel.`,
        });

      if (channel.type !== "GUILD_TEXT")
        return interaction.followUp({
          content: `Please provide a text channel.`,
        });

      await channel
        .send({
          content: `${msg}`,
        })
        .then(async () => {
          await interaction.editReply({
            content: `The message has been send to ${channel}`,
          });
        });
    } else {
      await interaction.deferReply().catch(() => {});
      await interaction.editReply({
        content: `${msg}`,
      });
    }
  },
};
