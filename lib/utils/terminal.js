/**
 * 执行终端命令相关代码
 *  - 开启子进程 spawn
 */

const { spawn } = require('child_process')

const commandSpawn = (...args) => {
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

module.exports = {
  commandSpawn
}