#!/bin/bash

if [ -z "$1" ]; then
    # main
    pnpm uv @dlightjs/dlight
    pnpm uv @dlightjs/types
    pnpm uv @dlightjs/emotion
    pnpm uv @dlightjs/components
    pnpm uv @dlightjs/material-icons
    pnpm uv @dlightjs/create-dlightjs

    # transpiler
    pnpm uv plugin/babel-plugin-dlight
    pnpm uv plugin/babel-preset-dlight
    pnpm uv @dlightjs/transpiler
    pnpm uv @dlightjs/transpiler-standalone
    pnpm uv plugin/vite-plugin-dlight

else
    # 指定要设置的新版本号
    package_path="./packages/${1}/package.json"
    current_package_version=$(grep -Po '(?<="version": ")[^"]*' $package_path)

    # 获取当前版本号
    new_version=$(grep -Po '(?<="version": ")[^"]*' ./package.json)

    # 如果版本号相同，则退出脚本
    if [ "$new_version" = "$current_package_version" ]; then
    echo "\033[33m${1} version is already $new_version\033[0m"
    exit 0
    fi

    # 更新版本号
    sed -i "s/\"version\": \"$current_package_version\"/\"version\": \"$new_version\"/" $package_path

    # 打印新版本号
    echo "\033[32m${1} version updated from $current_package_version to $new_version\033[0m"
fi