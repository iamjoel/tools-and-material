# 安装
[文档](https://codex.wordpress.org/zh-cn:Main_Page)

在 Mac 上。 wordpress 需要的环境：MySql,PHP和 apache 可以用[XAMPP](https://www.apachefriends.org/index.html)（Apache + MariaDB + PHP + Perl） 来弄(自己一个个配置很痛苦。。。)。

在 Coding 上安装很简单。只要开启动态服务服务，改改 wp-config.php 中关于数据库的配置文件即可。数据库的信息，coding 会生成一个。

## 用户角色
subscribe


## XAMPP 是一些设置
### 让本机能访问 phpMyAdmin 的做法
点XAMPP 的 volumn 下的explore 。编辑 `/opt/lampp/etc/extra/httpd-xampp.conf` 。将
```
<Directory "/opt/lampp/phpmyadmin">
  AllowOverride AuthConfig
  Require local
```

改成

```
<Directory "/opt/lampp/phpmyadmin">
  AllowOverride AuthConfig
  Require all granted
```

## 安装 wordpress
0 创建数据库 wordpress

1 将 wordpress 下的 wp-config-sample.php 重命名为wp-config.php 。修改里面的 DB_NAME 等一系列数据库配置。

2 将 wordprss 移动到 (点XAMPP 的 volumn 下的explore) htdocs 下。 

3 访问 `http://192.168.64.2/wordpress/wp-admin/install.php`

4 输入网站的一些信息，就安装完成拉~

## 权限设置
上传图片之类，需要设置权限
```
cd xxx/htdocs/wordpress/
cd wp-content
chmod 777 .
chmod 777 ./plugins
chmod 777 ./themes
chmod 777 ./uploads
```

## 安装主题会要输入ftp 帐号密码的解决方案
在 wp-config.php 文件中添加下面的代码：
```
define('FS_METHOD', 'direct');
define('FS_CHMOD_DIR', 0777);
define('FS_CHMOD_FILE', 0777);
```

## 页面模板
有些主题会有页面模板供选择。











