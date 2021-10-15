const fs = require('fs')
const path = require('path')

function getAbsolutePath(folder) {
  return `${__dirname}/../docs/${folder}`
}

function makeNavRoute(folderName, text) {
  const extension = '.md'
  const basePath = path.join(getAbsolutePath(folderName))

  const files = fs
    .readdirSync(basePath)
    .filter(fileName => {
      if (fileName.toLowerCase() === 'readme.md') return false

      return fs.statSync(path.join(basePath, fileName)).isFile() && path.extname(fileName) === extension
    })
    .map(fileName => `/${folderName}/${fileName}`)
  return [{ text: text ? text : folderName, children: [...files] }]
}

function makeSidebarRoute(subPathName, text) {
  return { [`/${subPathName}/`]: makeNavRoute(subPathName, text) }
}

module.exports = {
  makeNavRoute,
  makeSidebarRoute,
}
