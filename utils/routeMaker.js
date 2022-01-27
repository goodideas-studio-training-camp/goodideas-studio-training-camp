const fs = require('fs')
const path = require('path')

function getAbsolutePath(folder) {
  return `${__dirname}/../docs/${folder}`
}

/**
 * Custom nav bar Router maker
 * @param {*} folderName 資料夾名稱
 * @param {*} text 顯示在 nav 上面的文字
 * @returns { text: string, children: string[] }
 */
function makeNavRoute(folderName, text) {
  const extension = '.md'
  const basePath = path.join(getAbsolutePath(folderName))

  const files = fs
    .readdirSync(basePath)
    .filter(fileName => {
      // 跳過 readme.md
      if (fileName.toLowerCase() === 'readme.md') return false

      return fs.statSync(path.join(basePath, fileName)).isFile() && path.extname(fileName) === extension
    })
    .map(fileName => `/${folderName}/${fileName}`)
  return [{ text: text ? text : folderName, children: [...files] }]
}

/**
 * Custom sidebar router maker
 * @param {*} folderName 資料夾名稱
 * @param {*} text 顯示在 sidebar 上的文字
 * @returns
 */
function makeSidebarRoute(folderName, text) {
  return { [`/${folderName}/`]: makeNavRoute(folderName, text) }
}

module.exports = {
  makeNavRoute,
  makeSidebarRoute,
}
