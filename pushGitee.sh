#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd public

# git命令
git init
git add -A
git commit -m '上传'


# 上传
git remote add origin https://gitee.com/xiyang6/xiyang6.git
git push -f origin "master"

cd -
