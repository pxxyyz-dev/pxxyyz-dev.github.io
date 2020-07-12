#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add -A
git commit -m 'Update'
git push -f git@github.com:pxxyyz-dev/pxxyyz-dev.github.io.git source