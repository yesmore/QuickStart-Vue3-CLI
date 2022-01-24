const fs = require('fs')
const path = require('path')

const createDirSync = (pathName) => {
  // 判断当前路径是否存在
  if(fs.existsSync(pathName)) {
    return true
  } else {
    if(createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

module.exports = createDirSync