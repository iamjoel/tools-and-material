# httpd
apache的一个服务器。可用用来跑php。 

[官网](http://httpd.apache.org) [文档](http://httpd.apache.org/docs/2.4/)。

目前用的是 2.4 版本的。

## 安装
[官方安装文档](http://httpd.apache.org/docs/2.4/install.html)
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

## 常用命令
启动
```
cd 安装目录
sudo bin/apachectl -k start
# 或
sudo bin/apachectl -f conf/httpd.conf
```

-f 后面的是配置文件。

关闭
```
apachectl -k stop

```

重启
```
apachectl -k restart
```


## 问题
1. 如何添加模块？
2. 如何加 php 的模块？
网上都说在 httpd.conf 中打开注释

```
#LoadModule php5_module
```

我找不到。。。

