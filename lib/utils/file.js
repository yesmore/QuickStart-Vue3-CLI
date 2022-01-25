const fs = require('fs')
const path = require('path')
const ejs = require('ejs');

const log = require('./log');

const ejsCompile = (templatePath, data={}, options = {}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, options, (err, str) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(str);
    })
  })
}

const writeFile = (path, content) => {
  if (fs.existsSync(path)) {
    log.error("the file already exists~")
    return;
  }
  return fs.promises.writeFile(path, content);
}

const mkdirSync = (pathName) => {
  // 判断当前路径是否存在
  if(fs.existsSync(pathName)) {
    return true
  } else {
    if(mkdirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

module.exports = {
  ejsCompile,
  writeFile,
  mkdirSync
}