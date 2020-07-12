#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git add -A
git commit -m 'Update'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:pxxyyz-dev/pxxyyz-dev.github.io.git source
