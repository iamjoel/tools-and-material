# 微信小助手
借助[wxpy](https://github.com/youfou/wxpy)来实现些自己的功能。

## 启动
1. 下载本项目源码 `git clone https://github.com/iamjoel/wechat-assistant`
1. 安装 python3
1. 安装依赖 `pip install -r requirements.txt`
1. 去[图灵机器人官网](http://www.tuling123.com/)申请 api key，替换代码中[这里的值](https://github.com/iamjoel/wechat-assistant/blob/master/bot.py#L9)。
1. `python3 bot.py`

## 退出
quit()  

## 支持功能
1. 加好友后，发送自我介绍，并进行聊天（需要设置机器人微信帐号加好友的策略为，需要验证加好友。当然，无论他的验证信息是什么，都会被同意的）。
1. 加好友或在群里 @他，来进行聊天（用的图灵123）。
1. 发送关键字，发送群邀请。

## 参考
* [官方的代码片段](https://gist.github.com/youfou)
* [LCBot](https://github.com/LCTT/LCBot)
* [如何让机器人持续在线？](https://github.com/LCTT/LCBot/wiki/Daemon)