// ejs模板编译
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const compile = (template, data) => {
  const templatePos = `../templates/${template}` // 寻找模板
  const templatePath = path.resolve(__dirname, templatePos)

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {
      data
    }, {}, (err, result) => {
      if (err) {
        console.log('[QSVC-ERROR] ', err);
        reject(err)
        return;
      }

      resolve(result)
    })
  })
}

// 写入文件
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile
}