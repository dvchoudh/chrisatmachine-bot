import discord
from discord.ext import commands
import os
client = commands.Bot(command_prefix=['c@m ', 'C@m ', 'c@M ', 'C@M '])


extensions = ['cogs.Commands', 'cogs.Moderation', 'cogs.Polls']

if __name__ == '__main__':
    for e in extensions:
        client.load_extension(e)


@client.event
async def on_ready():
    await client.change_presence(status=discord.Status.online, activity=discord.Game('the prefix c@m | c@m help'))
    print("Bot is connecting...\n")
    print("Bot is live!")


client.run('Your BOT Token')
