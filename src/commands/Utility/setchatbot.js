//@ts-check
const Discord = require("discord.js");
const fetch = require("node-fetch");
const Schema = require('../../../schemas/chatbot-channel')
/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "setchatbot",
  aliases: ["setcb"],
  category: "Utility",
  description: "Set a channel for the chatbot to respond in",
  cooldown: 10,
  globalCooldown: false,
  canNotDisable: false,
  canNotSetCooldown: false,
  canNotAddAlias: false,
  hideCommand: false,
  perms: ["MANAGE_CHANNELS"],
  clientPerms: [],
  devOnly: false,
  someServersOnly: false,
  serverOwnerOnly: false,
  nsfw: false,
  arguments: [],

  execute: async function ({ client, message, args, flags }) {
    if(args[0] === 'remove'){
      Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (data) data.delete();
        message.lineReply(`Deleted current chatbot channel`);
      })
    } else {
      const channel = message.mentions.channels.first() || message.channel;
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) data.delete();
      new Schema({
        Guild: message.guild.id,
        Channel: channel.id,
      }).save();
      message.lineReply(`Saved chatbot channel to ${channel}`);
    })
    }
    
  },
};