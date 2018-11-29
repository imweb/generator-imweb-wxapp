#! /usr/bin/env sh
# npm 跟 node 要加入到 PATH 环境变量中
source ~/.bash_profile;

# $* 的值为 $1$2... 参数，如 run lint
npm $*;
EXCODE=$?;

if [ "$EXCODE" != "0" ]
then
  echo "[错误]执行 npm $* 失败";
  exit 1;
fi
