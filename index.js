#!/usr/bin/env node

const program = require('commander')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')

// 版本号 --version
program.version(require('./package.json').version)

// help - 可选参数
helpOptions()
// 创建其他指令
createCommands()

// 解析指令参数（解析 --version 等终端命令参数）
program.parse(process.argv)
