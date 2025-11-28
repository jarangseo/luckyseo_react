#!/bin/bash
# Git remote 설정 스크립트

# 기존 origin이 있으면 제거
if git remote get-url origin &>/dev/null; then
  echo "기존 origin을 제거합니다..."
  git remote remove origin
fi

# 새로운 origin 추가
echo "새로운 origin을 추가합니다..."
git remote add origin git@github.com:jarangseo/luckyseo_react.git

# 확인
echo "설정된 remote:"
git remote -v


