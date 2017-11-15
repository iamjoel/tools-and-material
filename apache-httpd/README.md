# httpd
apache的一个服务器。可用用来跑php。 

[官网](http://httpd.apache.org) [文档](http://httpd.apache.org/docs/2.4/)。

目前用的是 2.4 版本的。

## 安装
```
./configure --prefix=安装的地址
make
make install
```

详细见[这里](http://www.cnblogs.com/richaaaard/p/5029212.html)。

## 配置
配置文件 `安装地址/config/httpd.conf`。常用的几个配置项如下：

```
# 端口
Listen 8080

# 域名或ip
ServerName 127.0.0.1

# 路径
DocumentRoot "/xxx"
<Directory "/xxx">
</Directory>

# 加载模块
LoadModule xxx modules/xxx
```

## 问题
1. 如何添加模块？
2. 如何加 php 的模块？

