import discord
import re
from discord.ext import commands
import requests
import random

class Commands(commands.Cog):
    
    def __init__(self, bot):
        self.bot = bot

    async def build_docs_lookup_table(self, page_types):
        cache = {}
        for key, page in page_types.items():
            async with self.bot.session.get(page + '/objects.inv') as resp:
                if resp.status != 200:
                    raise RuntimeError('Cannot build docs lookup table, try again later.')

                stream = SphinxObjectFileReader(await resp.read())
                cache[key] = parse_object_inv(stream, page)

        self._docs_cache = cache

    async def get_docs(self, ctx, key, obj):
        page_types = {
            'latest': 'https://discordpy.readthedocs.io/en/latest',
            'python': 'https://docs.python.org/3',
            'lua': 'https://www.lua.org/docs.html',
            'neovim': 'https://neovim.io/doc/user/',
            'neovim-plugins': 'https://github.com/rockerBOO/awesome-neovim',
        }

        if obj is None:
            await ctx.send(page_types[key])
            return

        if self._docs_cache is None:
            await self.build_docs_lookup_table(page_types)

        obj = re.sub(r'^(?:discord\.(?:ext\.)?)?(?:commands\.)?(.+)', r'\1', obj)

        if key.startswith('latest'):
            q = obj.lower()  # point the abc.Messageable types properly:
            for name in dir(discord.abc.Messageable):
                if name[0] == '_':
                    continue
                if q == name:
                    obj = f'abc.Messageable.{name}'
                    break

        cache = list(self._docs_cache[key].items())

        matches = finder(obj, cache, key=lambda t: t[0], lazy=False)[:8]

        if len(matches) == 0:
            return await ctx.send('Could not find anything. Sorry.')

        e = discord.Embed(colour=discord.Colour.blue())

        author = {
            "latest": "discord.py",
            "python": "python",
        }.get(key, key)

        e.set_author(name=f"{author} docs result", url=page_types.get(key, 'unknown'))
        e.description = '\n'.join(f'[`{key}`]({url})' for key, url in matches)
        await ctx.send(embed=e)

    @commands.group(invoke_without_command=True)
    async def docs(self, ctx, *, obj: str = None):
        """Outputs a documentation link for a discord.py entity, and many others."""
        if ctx.invoked_subcommand is None:
            await self.get_docs(ctx, 'latest', obj)

    @docs.command(name='python', aliases=['py'])
    async def python_docs(self, ctx, *, obj: str = None):
        """Gives you a documentation link for a Python entity.
        Props to github.com/Rapptz"""
        await self.get_docs(ctx, 'python', obj)

    @docs.command(name='lua', aliases=['l'])
    async def lua_docs(self, ctx, *, obj: str = None):
        """Gives you a documentation link for a Lua entity.
        Props to github.com/Rapptz"""
        await self.get_docs(ctx, 'lua', obj)

    @docs.command(name='neovim', aliases=['nvim'])
    async def neovim_docs(self, ctx, *, obj: str = None):
        """Gives you a documentation link for a Neovim entity.
        Props to github.com/Rapptz"""
        await self.get_docs(ctx, 'neovim', obj)

    @docs.command(name='neovim-plugins', aliases=['nvim-plugins'])
    async def neovim_plugins(self, ctx, *, obj: str = None):
        """Gives you a documentation link for a Neovim-plugins entity.
        Props to github.com/Rapptz"""
        await self.get_docs(ctx, 'neovim-plugins', obj)

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
        
    @commands.command(name="suggest")
    async def suggestion(self, ctx, *, suggestion: str):
        """Make a poll/suggestion"""
        await ctx.message.delete()
        em = discord.Embed(description=suggestion)
        em.set_author(name=f"Poll by {ctx.author.display_name}", icon_url=ctx.author.avatar_url)
        msg = await ctx.send(embed=em)
        await msg.add_reaction('👍')
        await msg.add_reaction('👎')

    @commands.command()
    async def members(self, ctx):
        """Shows how many members are in this server"""
        await ctx.send(f"```Members: {ctx.guild.member_count}```")

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
    async def purge(self, ctx, amount: int):
        """Deletes messages (staff only)"""
        await ctx.channel.purge(limit=amount)

    @purge.error
    async def purge_error(self, ctx, error):
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
        await channel.send(f"Welcome to Chris's Community {member.mention}")
        role = discord.utils.get(member.guild.roles, name="Verified")
        await member.add_roles(role)

    @commands.command(name='website', aliases=['web'])
    async def website(self, ctx):
        """Get the link to Chris's website!"""
        embed = discord.Embed(title="Chris's Website", description="[Visit the website!](https://www.chrisatmachine.com/)")
        await ctx.message.delete()
        await ctx.send(embed=embed)

    @commands.command()
    async def twitter(self, ctx):
        """View Chris's Twitter"""
        embed = discord.Embed(title="Chris's Twitter!",
                              description="[View Chris's Twitter!](https://twitter.com/chrisatmachine)")
        await ctx.message.delete()
        await ctx.send(embed=embed)

def setup(bot):
    bot.add_cog(Commands(bot))
