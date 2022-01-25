// 创建项目的行为
const path = require('path');
const { promisify } = require('util') // 回调转Promise
const downloadRepo = promisify(require('download-git-repo'));

const { vueRepo } = require('../config/repo-config')
const terminal = require('../utils/terminal')
const { ejsCompile, writeFile, mkdirSync } = require('../utils/file')
// const { compile, writeToFile } = require('../utils/compile')
const log = require('../utils/log');

// 新建项目action
const createProjectAction = async (project) => {
  log.hint('\n🚀 QSVC help you Quick Start Vue3 Project!\n');
  try {
    // 1.clone项目(异步转同步下载)
    // callback -> promisify -> Promise -> async/await
    log.hint('🚀 拉取远程代码...')
    await downloadRepo(vueRepo, project, {
      clone: true
    })
    log.success('🚀 拉取结束...')

    // 2.执行npm install / yarn
    // console.log('***************** 🚀安装依赖中... ***************');
    log.hint('🚀 安装依赖中...')
    const command = process.platform === "win32" ? "yarn.cmd" : "yarn"
    await terminal.spawn(command, ['install'], {
      cwd: `./${project}`
    })
    log.clear()
    log.success('🛠️  安装完成...')

    // 3.运行npm run dev / yarn dev
    log.hint('🚀 启动项目中...')
    terminal.spawn(command, ['dev'], {
      cwd: `./${project}`
    })
    log.success('🛠️  已启动...')
  } catch (err) {
    log.error('[QSVC-ERROR] ', err)
  }
}

const handleEjsToFile = async (name, dest, template, filename) => {
  // 1.对应 ejs 模块
  // 2.编译 ejs 模板 result
  // 3.将 result 写入到 .vue 文件中
  // 4.放到对应的文件夹中

  // 1.获取模块引擎的路径
  const templatePath = path.resolve(__dirname, template);
  const result = await ejsCompile(templatePath, {name, lowerName: name.toLowerCase()});

  // 2.写入文件中
  // 判断文件不存在,那么就创建文件
  mkdirSync(dest);
  const targetPath = path.resolve(dest, filename);
  writeFile(targetPath, result);
}

// 添加组件action
const addComponentAction = async (name, dest) => {
  handleEjsToFile(name, dest, '../templates/vue-component.ejs', `${name}.vue`);
}

// 添加页面
const addPageAction = async (name, dest) => {
  addComponentAction(name, dest);
  // const lowerName = name.toLowerCase()
  // const data = {
  //   name,
  //   lowerName: name.toLowerCase(),
  // }
  // const pageResult = await compile("vue-component.ejs", data)

  // // 判断路径是否存在, 不存在则创建对应文件夹
  // const targetDest = path.resolve(dest, lowerName)
  // if(createDirSync(targetDest)) {
  //   const targetPagePath = path.resolve(targetDest, `index.vue`)
  //   writeToFile(targetPagePath, pageResult)
  // }
}

// 添加store模块
const addStoreAction = async (name, dest) => {
  handleEjsToFile(name, dest, '../templates/vue-store.ejs', 'index.ts')
  handleEjsToFile(name, dest, '../templates/vue-types.ejs', 'types.ts')
  // const lowerName = name.toLowerCase()
  // const data = {
  //   name,
  //   lowerName: name.toLowerCase(),
  // }
  // const storeResult = await compile('vue-store.ejs', data)
  // const typesResult = await compile("vue-types.ejs", data)

  // const targetDest = path.resolve(dest, lowerName)
  // if(createDirSync(targetDest)) {
  //   const targetStorePath = path.resolve(targetDest, `index.ts`)
  //   const targetTypePath = path.resolve(targetDest, `types.ts`)

  //   writeToFile(targetStorePath, storeResult)
  //   writeToFile(targetTypePath, typesResult)
  // }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAction,
  addStoreAction
}