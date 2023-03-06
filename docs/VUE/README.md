---
title: VUE的搭建
date: 2022-5-30
permalink: /docs/VUE/
autoSort: 20
tags:
 - VUE
categories: 
 - VUE
---

## 使用脚手架搭建

### 安装命令

 vue： `npm i vue -g`
 脚手架： `npm i vue-cli -g`

### 配置淘宝镜像

可以使进入项目时加载速度快一些 `npm config set registry https://registry.npm.taobao.org`

### vue不是内部命令问题

输入 `npm config list` 查看安装位置
[![joJInU.png](https://s1.ax1x.com/2022/07/18/joJInU.png)](https://imgtu.com/i/joJInU)****

找到划线的路径查看是否有vue.cmd文件
[![joJHAJ.md.png](https://s1.ax1x.com/2022/07/18/joJHAJ.md.png)](https://imgtu.com/i/joJHAJ)

在我的电脑环境变量中加上此路径<br/>
![环境变量](https://s1.ax1x.com/2022/07/18/joYi4A.png)<br/>
[![joYrgx.png](https://s1.ax1x.com/2022/07/18/joYrgx.png)](https://imgtu.com/i/joYrgx)<br/>

### 创建一个项目

创建`vue create 项目名称`
