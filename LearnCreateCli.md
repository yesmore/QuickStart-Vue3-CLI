# 创建你的 QuickStartVue3-CLI



## 一、创建自己的终端命令

效果：

```shell
# 在终端执行下面的命令：
$ qsvc
```

> `qsvc` 是本项目名称（QuickStartVue3-CLI）简写形式，用作根命令。

打印：

<img src='https://cdn.jsdelivr.net/gh/yesmore/img/img/W)ZFV7FJQT(ZTY8TRYXS2RR.png'/>

该指令会执行跟目录下的 `index.js` 文件内容

```js
#!/usr/bin/env node

console.log('定义自己的终端命令');
```

### 创建终端命令

1.创建一个项目文件夹 `QuickStartVue3-CLI`，打开终端依次执行命令：

```shell
$ cd QuickStartVue3-CLI
$ npm init -y
```

2.在生成的 `package.json` 目录中，添加以下内容

```js
"bin": {
  "qsvc": "index.js"
},
```

其他：

```js
{
  "name": "quickstartvue3-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "qsvc": "index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

3.在根目录下新建 `index.js` 文件

<img src='https://cdn.jsdelivr.net/gh/yesmore/img/img/3`XZQVBNU`BZW`}F{17EM5B.png'/>

`index.js` 文件内容：

```js
#!/usr/bin/env node

console.log('定义自己的终端命令');
```

> #!/usr/bin/env node 会指定脚本运行环境，可参考 python 脚本用法。

4.在终端执行 `npm link` 命令链接本地node环境：

<img src='https://cdn.jsdelivr.net/gh/yesmore/img/img/7@3]DHKRE{~I@RPHW59XLPC.png'>

5.结束，终端执行 `qsvc` 测试效果：

<img src='https://cdn.jsdelivr.net/gh/yesmore/img/img/W)ZFV7FJQT(ZTY8TRYXS2RR.png'/>



## 二、使用commander包定义指令

效果：终端执行 `qsvc --version` ，打印当前版本号。

1.安装依赖

```shell
$ npm i commander
```

2.在 `index.js` 文件中添加以下内容：

```js
#!/usr/bin/env node

const program = require('commander')
// 版本号 --version
program.version('1.0.0')

// 解析指令参数（解析 --version 等终端命令参数）
program.parse(process.argv)
```

3.测试效果：

<img src='https://cdn.jsdelivr.net/gh/yesmore/img/img/04W}K1{QSAGYN_W$8R]ZO~J.png'>

命令：`qsvc --version`、`qsvc -V` 、`qsvc --help`

4.获取 `package.json` 文件内的版本号

首先修改  `package.json` 文件中的版本号：

```js
"version": "0.1.1",
```

然后修改 `index.js` 文件内容：

```js
#!/usr/bin/env node

const program = require('commander')
// 加载package.json中的版本号
program.version(require('./package.json').version)

// 解析指令参数（解析 --version 等终端命令参数）
program.parse(process.argv)
```

效果：

<img src='https://cdn.jsdelivr.net/gh/yesmore/img/img/_V@X~14]F`4$8ENC59R5`@7.png'>



## 三、增加自定义 option 及可选参数

效果：即执行 `qsvc --help` 时打印的option参数内容。

使用接口：`program.option`

```js
#!/usr/bin/env node

const program = require('commander')

// 版本号 --version
program.version(require('./package.json').version)

program.option('-d, --dest <文件路径>', '目标文件夹，例: -d /src/components')

// 解析指令参数（解析 --version 等终端命令参数）
program.parse(process.argv)

const options = program.opts();
console.log(options.dest);
```

关键代码：

```js
program.option('-d --dest <文件路径>', '目标文件夹，例: -d /src/components')
```

上面代码的含义是：

- 参数1：定义一个 `-d` / `--dest` 指令，后面跟上可选参数 `文件路径`
- 参数2：解释说明

效果：

<img src='https://cdn.jsdelivr.net/gh/yesmore/img/img/QQ图片20220124110057.png'>

同理，定义其他指令：

```js
program.option('-q, --qsvc', 'A  CLI of Quick Start Vue3')
program.option('-d, --dest <dest>', '目标文件夹，例: -d /src/components')
program.option('-f, --framework <framework>', '选择框架，例vue、react')

```

也可以重写原有指令，如 `--help` ：

```js
program.on('--help', function () {
  console.log('');
  console.log('Other:');
  console.log(' other options.');
})
```

为了管理文件，将代码封装为模块：

<img src='https://cdn.jsdelivr.net/gh/yesmore/img/img/$HOP}GKJVYP$FU`12`6@EP9.png'>



## 四、使用终端命令新建文件/文件夹

效果：终端执行命令 `qsvc create vue-demo`，将会从远程clone代码到本地，初始化一个项目（参考 @vue-cli 的 `vue create hello-world` 命令）。

1.首先在 `core` 目录中新建一个 `create.js` 模块，并在 index.js 中导入

文件内容：

```js
const program = require('commander')

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone repo into a folder')
    .action((project, others) => {
      console.log(project, others);
    })
}

module.exports = createCommands;
```

效果：

<img src='https://cdn.jsdelivr.net/gh/yesmore/img/img/QQ图片20220124112810.png'>

2.clone远程代码

在core目录中新建 `action.js` 文件，将所有**create**的**action**封装为模块

```js
// action.js
const createProjectAction = (project) => {

}

module.exports = {
  createProjectAction
}
```

```js
// create.js
const program = require('commander')
import { createProjectAction } from './action'

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone repo into a folder')
    .action((project, others) => {
      createProjectAction(project);
    })
}

module.exports = createCommands;
```

2.下载Github仓库代码

脚手架中的模板代码一般存储在**远程仓库**中，比如 Github，这里使用开源项目 [download-git-repo](https://gitlab.com/flippidippi/download-git-repo) (vue-cli也使用该库) 来下载 Github 远程代码到本地。

安装依赖：

```js
npm i download-git-repo
```



