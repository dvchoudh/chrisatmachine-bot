import discord
import re
from discord.ext import commands
import requests
import random

class Commands(commands.Cog):
    
    def __init__(self, bot):
        self.bot = bot

    @commands.command(passcontext=True)
    async def youtube(self, ctx, *, arg):
        """Search YouTube"""
        query = str(arg)
        # print("query: ", query)
        url = "https://www.youtube.com/results?search_query="
        with requests.get(url + query) as response:
            # regex = '/watch\?v\=[a-zA-z0-9/_/-/*]+'
            regex = '/watch\?v\=(.*?)\"'
            # regex = r'/watch\?v=[a-zA-Z0-9]+'
            match = re.findall(regex, response.text)[0]
            payload = "https://www.youtube.com/watch?v=" + match
            # print(payload)
            await ctx.send(f"> Here is your result for: {query}\n{payload}")
        
    @commands.command()
    async def poll(self, ctx, *, message):
        """Creates a poll"""
        embd = discord.Embed(title=f"Poll created by {ctx.author}", description=f"{message}")
        msg = await ctx.channel.send(embed=embd)
        await msg.add_reaction("👍")
        await msg.add_reaction("👎")
        
    @commands.command()
    async def users(self, ctx):
        """Shows how many members are in this server"""
        await ctx.send(f"```Number of members: {ctx.guild.member_count}```")

    @commands.command()
    async def say(self, ctx, *, msg):
        """Interacts with the bot and sends a message"""
        await ctx.message.delete()
        await ctx.send("{}" .format(msg))
        
    @commands.command()
    async def info(self, ctx, member: discord.Member=None):
        """User info"""
        member = ctx.author if not member else member
        roles = [role for role in member.roles if role.name != "@everyone"]
        
        create_date = member.created_at.strftime("%B %#d, %Y, %I:%M:%S %p ")
        join_date = member.joined_at.strftime("%B %#d, %Y, %I:%M:%S %p")
        values = []
        values.append(f"\n**Account created on**: {create_date}")
        values.append(f"\n**Joined server on**: {join_date}")
        values.append(f"\n**Roles [{len(roles)}]**: " + " ".join([role.mention for role in roles]))
        values.append(f"\n**Bot**: {member.bot}")
        
        userinfo = discord.Embed(title=f"**{member.display_name}**", colour=discord.Colour.dark_magenta(), timestamp=ctx.message.created_at,
        description=" ".join(values))
        userinfo.set_author(name=f"User Info - {member}", icon_url=member.avatar_url)
        userinfo.set_thumbnail(url=member.avatar_url)
        userinfo.set_footer(text=f"Requested by {ctx.author}", icon_url=ctx.author.avatar_url)
        
        
    @commands.command(aliases=["av"])
    async def avatar(self, ctx, member: commands.MemberConverter = None):
        """What's your profile pic?"""
        member = member or ctx.author
        embed = discord.Embed()
        embed.set_author(name=f"{ctx.author}", icon_url=member.avatar_url)
        embed.set_footer(text=f"Requested by {ctx.author.display_name}")
        embed.set_image(url=member.avatar_url)
        await ctx.send(embed=embed)


    @commands.command()
    @commands.has_permissions(manage_messages=True)
    async def clear(self, ctx, amount: int):
        """Deletes messages (staff only)"""
        await ctx.channel.purge(limit=amount)

    @clear.error
    async def clear_error(self, ctx, error):
        if isinstance(error, commands.MissingRequiredArgument):
            await ctx.send('Please specify an amount of messages to delete.')

    @commands.command(aliases=["8ball"])
    async def _8ball(self, ctx, *, question):
        """8ball game"""
        responses = ['It is certain.',
                     'It is decidedly so.',
                     'Without a doubt.',
                     'Yes – definitely.',
                     'You may rely on it.',
                     'As I see it, yes.',
                     'Most likely.',
                     'Outlook good.',
                     'Yes.',
                     'Signs point to yes.',
                     'Reply hazy, try again.',
                     'Ask again later.',
                     'Better not tell you now.',
                     'Cannot predict now.',
                     'Concentrate and ask again.',
                     "Don't count on it.",
                     'My reply is no.',
                     'My sources say no.',
                     'Outlook not so good.',
                     'Very doubtful.']
        await ctx.send(f'Question: {question}\nAnswer: {random.choice(responses)}')

    @commands.Cog.listener()
    async def on_member_join(member):
        channel = discord.utils.get(member.guild.channels, name="welcomes")
        await channel.send(f"Welcome to Mohnish's Community {member.mention}")
        role = discord.utils.get(member.guild.roles, name="Verified")
        await member.add_roles(role)

def setup(bot):
    bot.add_cog(Commands(bot))
