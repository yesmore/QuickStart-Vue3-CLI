// 创建项目的行为
const path = require('path');
const { promisify } = require('util') // 回调转Promise
const download = promisify(require('download-git-repo'));

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const createDirSync = require('../utils/createDirSync')
const { compile, writeToFile } = require('../utils/compile')

// 新建项目action
const createProjectAction = async (project) => {
  console.log('QSVC help you Quick Start Vue3 Project!');
  try {
    // 1.clone项目(异步转同步下载)
    // callback -> promisify -> Promise -> async/await
    await download(vueRepo, project, {
      clone: true
    })

    // 2.执行npm install / yarn
    console.log('***************** 🚀安装依赖中... ***************');
    const command = process.platform === "win32" ? "yarn.cmd" : "yarn"
    await commandSpawn(command, ['install'], {
      cwd: `./${project}`
    })

    // 3.运行npm run dev / yarn dev
    commandSpawn(command, ['dev'], {
      cwd: `./${project}`
    })
    console.log('***************** 🚀点火~ ***************');

  } catch (err) {
    console.log('[QSVC-ERROR] ', err);
  }
}

// 添加组件action
const addComponentAction = async (name, dest) => {
  // 1.对应 ejs 模块
  // 2.编译 ejs 模板 result
  // 3.将 result 写入到 .vue 文件中
  // 4.放到对应的文件夹中
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  })

  if(createDirSync(dest)) {
    const targetPath = path.resolve(dest, `${name}.vue`)
    // console.log(targetPath);
    writeToFile(targetPath, result)
  }
}

// 添加页面及路由
const addPageAndRouteAction = async (name, dest) => {
  const lowerName = name.toLowerCase()
  const data = {
    name,
    lowerName: name.toLowerCase(),
  }
  const pageResult = await compile("vue-component.ejs", data)

  // 判断路径是否存在, 不存在则创建对应文件夹
  const targetDest = path.resolve(dest, lowerName)
  if(createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `index.vue`)
    writeToFile(targetPagePath, pageResult)
  }
}

// 添加store模块
const addStoreAction = async (name, dest) => {
  const lowerName = name.toLowerCase()
  const data = {
    name,
    lowerName: name.toLowerCase(),
  }
  const storeResult = await compile('vue-store.ejs', data)
  const typesResult = await compile("vue-types.ejs", data)

  const targetDest = path.resolve(dest, lowerName)
  if(createDirSync(targetDest)) {
    const targetStorePath = path.resolve(targetDest, `index.ts`)
    const targetTypePath = path.resolve(targetDest, `types.ts`)

    writeToFile(targetStorePath, storeResult)
    writeToFile(targetTypePath, typesResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}