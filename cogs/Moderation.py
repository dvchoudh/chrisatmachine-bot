import json
from discord.ext import commands
from discord.utils import get
import discord

class Moderation(commands.Cog):
    
    
    def __init__(self, bot):
        self.bot=bot

    with open('reports.json', encoding='utf-8') as f:
      try:
        report = json.load(f)
      except ValueError:
        report = {}
        report['users'] = []

    @commands.command(pass_context = True)
    async def warn(self, ctx, user:discord.User, *reason:str):
      if not reason:
        await commands.say("Please provide a reason")
        return
      reason = ' '.join(reason)
      for current_user in report['users']:
        if current_user['name'] == user.name:
          current_user['reasons'].append(reason)
          break
      else:
          report['users'].append({
          'name':user.name,
          'reasons': [reason,]
        })
      with open('reports.json','w+') as f:
        json.dump(report, f)

    @commands.command(pass_context = True)
    async def warnings(self, ctx, user:discord.User):
      for current_user in report['users']:
        if user.name == current_user['name']:
          await commands.say(f"{user.name} has been reported {len(current_user['reasons'])} times : {','.join(current_user['reasons'])}")
          break
      else:
        await commands.say(f"{user.name} has never been reported")

    @commands.command()
    async def dm(self, ctx, user_id=None, *, args=None):
        """DM's a specific user"""
        if user_id != None and args != None:
            try:
                target = await self.bot.fetch_user(user_id)
                await target.send(args)

                await ctx.channel.send("'" + args + "' has been sent to: " + target.name)

            except:
                await ctx.channel.send("Couldn't dm the given user.")

        else:
            await ctx.channel.send("A user_id and/or arguments were not included.")

    @commands.command()
    @commands.has_permissions(kick_members=True)
    async def kick(self, ctx, member: discord.Member, reason: str = None):
        """Kick function"""
        if ctx.author != member:
            await member.kick(reason=reason)
            await ctx.send(f"{member.display_name} has been kicked.")
        else:
            await ctx.send(f"You can't kick yourself {member.mention}")

    @commands.command()
    @commands.has_permissions(ban_members=True)
    async def ban(self, ctx, member : discord.Member, *, reason=None):
        """Ban Function"""
        await member.ban(reason=reason)
        await ctx.send(f'Banned {member.mention}')

    @commands.command()
    @commands.has_permissions(ban_members=True)
    async def unban(self, ctx, *, member):
        """Unban Function"""
        banned_users = await ctx.guild.bans()
        member_name, member_discriminator = member.split('#')

        for ban_entry in banned_users:
            user = ban_entry.user

            if (user.name, user.discriminator) == (member_name, member_discriminator):
                await ctx.guild.unban(user)
                await ctx.send(f'Unbanned {user.mention}')
                return

    @commands.Cog.listener()
    async def on_message_delete(self, message):
        embed = discord.Embed(title="Message Deleted", color=0xf40000)
        embed.add_field(name="Before", value=f"{message.content}: was Deleted!", inline=False)
        bot_logs = '755669734690652271'
        channel = message.guild.get_channel(755669734690652271)  # bot_logs must be an integer id
        await channel.send(discord.Object(id=bot_logs), embed=embed)

    @commands.command(name="mute")
    @commands.has_permissions(ban_members=True)
    async def mute(self, ctx, member: discord.Member, *, reason=None):
      """Mute function"""
      await member.add_roles(get(member.guild.roles, name='Mute'))
      await ctx.send(embed=discord.Embed(title=f"Muted {member.display_name}", color=discord.Colour.blue()))

    @commands.command()
    @commands.has_permissions(ban_members=True)
    async def unmute(self, ctx, member: discord.Member):
        """Unmute function"""
        await member.remove_roles(get(member.guild.roles, name="Muted"))
        await ctx.send(embed=discord.Embed(title=f"Unmuted {member.display_name}", color=discord.Colour.blue()))


def setup(client):
    client.add_cog(Moderation(client))
