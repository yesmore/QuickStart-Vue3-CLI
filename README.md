

<p align="center">
    <h1>🐾 QuickStart-Vue3-CLI<h1/>
</p>
<p>
  <a href="https://www.npmjs.org/package/quickstart-vue3-cli" target='_blank'>
    <img src="https://img.shields.io/npm/v/quickstart-vue3-cli">
  </a>
  <a href="https://npmcharts.com/compare/quickstart-vue3-cli?minimal=true" target='_blank'>
    <img src="https://img.shields.io/npm/dt/quickstart-vue3-cli.svg">
  </a>
  <a href="https://npmcharts.com/compare/quickstart-vue3-cli?minimal=true" target='_blank'>
    <img src="https://img.shields.io/github/size/yesmore/QuickStart-Vue3-CLI/index.js">
  </a>
  <a href="https://gitter.im/yesmore/yesmoreforchat" target='_blank'>
    <img src="https://img.shields.io/gitter/room/yesmore/yesmoreforchat" alt="chat"/>
  </a>
  <img src="https://img.shields.io/github/license/yesmore/QuickStart-Vue3-CLI" alt="GPL"/>  
</p>

QuickStart-Vue3-CLI — 把**快**贯彻到底。

## 功能一览

`QuickStartVue3-CLI`（以下简称 `qsvc`） 使用 `nodejs` 开发，轻量快捷，功能专一。

- `create` 命令快速创建项目
- `addcpn` 命令快速创建组件
- `addpage` 命令快速创建页面
- `addstore` 命令快速创建状态模块

> 注意
>
> 当前版本仅支持 Pinia状态管理工具，因为本项目与 [QuickStart-Vue3](https://github.com/yesmore/QuickStart-Vue3) 结合较为紧密，其他拓展功能 maybe 会安排，暂不纳入计划中。

## 使用 `qsvc` 脚手架快速开始

#### 安装脚手架

```shell
$ npm i -g quickstart-vue3-cli
```

#### create - 创建一个Vue3项目

```shell
$ qsvc create vue3-demo
```

> 执行此步骤后，脚手架会自动拉取 `QuickStart-Vue3` 仓库中main分支代码，并自动安装所需依赖（执行 `yarn` 命令），请确保您安装了yarn工具包（`npm i -g yarn`），安装完成后，项目将自动打开浏览器，并运行在 http://localhost:8000/.

#### addpage - 新建页面

使用 `addpage` 命令可以快速创建一个页面：

```shell
$ qsvc addpage Home
```

该命令会默认在 `demo/src/pages` 目录下新建一个 `Home` 文件夹以及 `Home/index.vue` 文件。

其他参数：

- `-d <src/pages>`：将新建文件夹存放在指定目录下，若目录不存在则会新建目录，例：

```shell
$ qsvc addpage About -d src/pages
```



#### addcpn - 新建组件

使用 `addcpn` 命令可以快速创建一个组件：

```shell
$ qsvc addcpn Header
```

该命令会默认在 `demo/src/components` 目录下新建一个 `Header.vue` 文件。

其他参数：

- `-d <src/components>`：将新建文件夹存放在指定目录下，若目录不存在则会新建目录，例：

```shell
$ qsvc addcpn HelloWorld -d src/components
```



#### addstore - 新建状态

使用 `addstore` 命令可以快速创建一个页面：

```shell
$ qsvc addstore Auth
```

该命令会默认在 `demo/src/store/modules` 目录下新建一个 `Auth` 文件夹以及 `auth/index.ts` 和 `auth/types.ts` 文件。

其他参数：

- `-d <src/store/modules>`：将新建文件夹存放在指定目录下，若目录不存在则会新建目录，例：

```shell
$ qsvc addstore Auth -d src/store/modules
```



#### 其他功能

[下一步计划]()



## Licence

[GPL](https://github.com/yesmore/QuickStart-Vue3-CLI/blob/main/LICENSE)

