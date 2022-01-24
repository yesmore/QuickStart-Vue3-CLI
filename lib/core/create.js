/**
 * 创建指令模块
 * 
 */
const program = require('commander')
const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
} = require('./action')

const createCommands = () => {
  const options = program.opts();

  // 创建项目指令
  program
    .command('create <project> [others...]')
    .description('Clone repo into a folder, eg: qsvc create <project-name>')
    .action(createProjectAction)

  // 创建组件指令
  program
    .command('addcpn <name>')
    .description('Add a Vue3 component, eg: qsvc addcpn HelloWorld [-d src/components]')
    .action((name)=> {
      addComponentAction(name, options.dest || 'src/components')
    })

  // 创建页面指令
  program
    .command('addpage <page>')
    .description('Add a Vue3 page, eg: qsvc addpage About [-d src/pages]')
    .action((page)=> {
      addPageAndRouteAction(page, options.dest || 'src/pages')
    })

  // 创建store指令
  program
    .command('addstore <store>')
    .description('Add a Vue3 store module, eg: qsvc addstore Auth [-d src/store/modules]')
    .action((page)=> {
      addStoreAction(page, options.dest || 'src/store/modules')
    })
}

module.exports = createCommands;