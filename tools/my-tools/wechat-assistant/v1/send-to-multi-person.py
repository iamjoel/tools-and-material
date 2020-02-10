#!/usr/bin/python
# -*- coding:UTF-8 -*-

from wxpy import *

# 初始化机器人，扫码登陆
bot = Bot()

friends = bot.friends()
# freinds = bot.friends().search(city="苏州",sex=MALE)

for friend in friends:
  if 'Joel' in friend.nick_name:
    # friend.send((friend.nick_name + ':xxx 节日快乐').encode('utf-8'))
    friend.send(friend.nick_name + ':xxx Day happy')

embed()