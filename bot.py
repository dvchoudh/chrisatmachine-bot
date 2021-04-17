import discord
from discord.ext import commands
from discord.ext.commands import Bot
import datetime
import random
from random import randint
import os
import asyncio
client = commands.Bot(command_prefix=['c@m ', 'C@m ', 'c@M ', 'C@M '])


extensions = ['cogs.Commands', 'cogs.Moderation']

if __name__ == '__main__':
    for e in extensions:
        client.load_extension(e)


@client.event
async def on_ready():
    await client.change_presence(status=discord.Status.online, activity=discord.Game('the prefix c@m | c@m help'))
    print("Bot is connecting...\n")
    print("Bot is live!")


client.run('NzQ3NzI1NTM4MzAyNDkyNzc0.X0TDrA.s8F55aQxra8vLyJqD7pEKqNdU2I')
