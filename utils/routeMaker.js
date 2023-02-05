import fs from 'fs'
import path from 'path'

/**
 *
 * @param {*} folder /docs 底下的 folder name
 * @returns
 */
function getDirPath(folder) {
  return `${process.cwd()}/docs/${folder}`
}

const docsRootName = ''

/**
 * make vuepress route config
 * @param {[key: string]: string} map folder name - display name
 * @param {string[]} exceptions filder name or file name
 * @param {string} folderName If no spicial demand, do NOT changed, Thanks.
 * @returns
 */
export function makeNavRoute(map, exceptions = {}, folderName = docsRootName) {
  const extension = '.md'
  const basePath = getDirPath(folderName)

  const children = fs.readdirSync(basePath).reduce((accumulator, subDir) => {
    if (exceptions.includes(subDir)) return accumulator

    const state = fs.statSync(path.join(basePath, subDir))

    if (state.isFile() && path.extname(subDir) === extension) {
      accumulator.unshift(`${folderName}/${subDir}`)
    } else if (state.isDirectory()) {
      accumulator.push({
        text: map[subDir] ?? subDir,
        children: makeNavRoute(map, exceptions, `${folderName}/${subDir}`),
      })
    }
    return accumulator
  }, [])

  return children
}
