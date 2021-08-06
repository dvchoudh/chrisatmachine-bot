const { Collection, Client, MessageEmbed } = require("discord.js");
const client = new Client();
const { token, prefix } = require("./config/config.json");
const fs = require("fs");
commands = new Collection();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Chris", {
    type: "STREAMING",
    url: "https://www.twitch.tv/chrisatmachine",
  });
});

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    commands.set(command.name, command);
  }
}

client.on("message", async (message) => {
  console.log(message.content);
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  let commandName = args.shift().toLowerCase();
  const command = commands.get(commandName);

  // client.emit("checkMessage", message);

  try {
    if (command.args && !args.length) {
      if (command.usage) {
        const embed = new MessageEmbed()
          .setColor("#000000")
          .addField("Command: ", prefix + command.name)
          .addField("Description: ", command.description)
          .addField("Roles who can use this: ", command.roles)
          .addField("Usage: ", command.usage)
          .addField("Example: ", command.example);
        return message.channel.send(embed);
      }
    }

    command.execute(message, args);
    command.execute(client, message, args);
  } catch (error) {
    // message.reply("Invalid Command");
    console.log(error);
  }
  console.log(
    `  ${message.author.tag} in #${message.channel.name} sent: ${message.content}`
  );
});

client.login(token);
