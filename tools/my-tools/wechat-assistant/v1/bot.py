#!/usr/bin/python
# -*- coding:UTF-8 -*-

from wxpy import *
import re

# 初始化机器人，扫码登陆
bot = Bot()
apiKey = '去 http://www.tuling123.com/ 上去申请'

bot.enable_puid('wxpy_puid.pkl') # 不加参数，puid 会变。。。

# 新人入群的欢迎语
welcome_text = '''🎉 欢迎 @{} 的加入！
来做个简单的自我介绍吧~
'''

# 需管理的微信群

intro = '''
我是九彩拼盘大人的前端小助手~ 
发送：
入门：进入前端入门群交流
进阶：进入前端中级群交流
关键字：获得前端文章相关的关键字
博客：获得九彩拼盘的博客地址
'''

# 将群加入通讯录。否则有的群拿不到
allGroups = bot.groups()
groupText = allGroups.search('调戏机器人')[0]
groupJunior = allGroups.search('🐋 入门')[0]
groupSenior = allGroups.search('🐋 中级')[0]


groups = [groupJunior, groupSenior, groupText]

# ---------------- 配置结束 ----------------


tuling = Tuling(api_key=apiKey)

# 新人入群通知的匹配正则
rp_new_member_name = (
    re.compile(r'^"(.+)"通过'),
    re.compile(r'邀请"(.+)"加入'),
)

'''
加好友请求
'''
@bot.register(msg_types=FRIENDS)
def new_friends(msg):
    user = msg.card.accept()
    return intro

'''
好友的自动回复
'''
@bot.register(Friend, msg_types=TEXT)
def reply_my_friend(msg):
  return reply_it(msg)

'''
入群的新人欢迎消息
'''
@bot.register(groups, NOTE)
def welcome(msg):
    name = get_new_member_name(msg)
    if name:
        return welcome_text.format(name)

def get_new_member_name(msg):
    # itchat 1.2.32 版本未格式化群中的 Note 消息
    from itchat.utils import msg_formatter
    msg_formatter(msg.raw, 'Text')
    print(msg.text)
    for rp in rp_new_member_name:
        match = rp.search(msg.text)
        if match:
            return match.group(1)

'''
回复被 @ 的消息
'''
@bot.register(groups, TEXT)
def reply_group_msg(msg):
    if msg.is_at:
        return reply_it(msg)

'''
回复信息
'''
def reply_it(msg):
  sender = msg.member or msg.sender # 群聊中，会单独回复。
  if '入门' in msg.text:
    groupJunior.add_members(sender, use_invitation=True)
  elif '进阶' in msg.text:
    groupSenior.add_members(sender, use_invitation=True)
  else:
    tuling.do_reply(msg)

# 在 nohup（后台挂起）时执行下面的命令会报错，要用 bot.join()
embed()
# bot.join()

