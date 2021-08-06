//@ts-check

const Discord = require("discord.js");
const sourcebin = require("sourcebin");

/**
 * @type {import('../../typings.d').Command}
 */
module.exports = {
  name: "sourcebin",
  aliases: ["bin"],
  category: "Fun",
  description: "Upload code to sourcebin",
  cooldown: 10,
  globalCooldown: false,
  canNotDisable: false,
  canNotSetCooldown: false,
  canNotAddAlias: false,
  hideCommand: false,
  perms: [],
  clientPerms: [],
  devOnly: false,
  someServersOnly: false,
  serverOwnerOnly: false,
  nsfw: false,
  arguments: [],

  execute: async function ({ client, message, args, flags }) {
    message.channel.send("What language is the code?").then((msg3) => {
      let urdadcasueyes = message.channel
        .createMessageCollector((c) => c.author.id === message.author.id, {
          max: 1,
        })
        .on("collect", (c) => {
          let cod = c.content;
          message.channel.send("code content?").then((msg3) => {
            let urmomcauseyes = message.channel
              .createMessageCollector(
                (d) => d.author.id === message.author.id,
                { max: 1 }
              )
              .on("collect", (d) => {
                let desc = d.content;
                message.channel.send("file name?").then((msg3) => {
                  let urmomcauseyes = message.channel
                    .createMessageCollector(
                      (d) => d.author.id === message.author.id,
                      { max: 1 }
                    )
                    .on("collect", (f) => {
                      let footor = f.content;

                      sourcebin
                        .create([
                          {
                            name: footor,
                            content: desc,
                            language: cod,
                          },
                        ])

                        .then((bin) =>
                          message.channel.send(
                            `The Sourcebin url is ${bin.url}`
                          )
                        );
                    });
                });
              });
          });
        });
    });
  },
};
