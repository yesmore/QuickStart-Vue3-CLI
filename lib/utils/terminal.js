/**
 * 执行终端命令相关代码
 *  - 开启子进程 spawn
 */

const { spawn, exec } = require('child_process')

const spawnCommand = (...args) => {
  return new Promise((resolve, reject) => {
    // 执行子进程
    const childProcess = spawn(...args)
    // 将子进程输出转移到当前进程输出
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)

    // 通知执行结束
    childProcess.on('close', () => {
      resolve()
    })
    childProcess.on('error', function (err) {
      console.log('子进程开启失败: ' + err);
      process.exit();
    })
  })
}

const execCommand = (...args) => {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(stdout.replace('\n', ''));
      // console.log(stderr);
      resolve();
    })
  })
}

module.exports = {
  spawn: spawnCommand,
  exec: execCommand
}