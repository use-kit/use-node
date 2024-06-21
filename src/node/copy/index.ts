// import fs from 'node:fs'
import fastGlob from 'fast-glob'
import fsExtra from 'fs-extra'

export function copy(from: string, to: string, filter?: string) {
  fsExtra.copy(from, to, { filter: (file) => {
    // console.log(file)
    const isFile = fsExtra.statSync(file).isFile()
    const isTsFile = isFile && file.endsWith(filter ?? '.ts')
    const isExampleDir = !isFile
    return isTsFile || isExampleDir
    // return true
  } })
}

// copy('src/node/copy', 'src/c', '.ts')

export const copyDirectory = async (source: string, destination: string, filterFn: (file: string) => boolean) => {
  const files = await fastGlob(`${source}/**/*`, {
    onlyFiles: false,
    deep: Infinity,
  })

  for (const file of files) {
    if (filterFn(file)) {
      const relativePath = file.replace(source, '')
      const newPath = destination + relativePath
      if (fsExtra.statSync(file).isFile()) {
        fsExtra.copyFileSync(file, newPath)
      }
      else {
        fsExtra.ensureDirSync(newPath)
      }
    }
  }
}

export const filterFunction = (file: string) => {
  const isFile = fsExtra.statSync(file).isFile()
  const isTxtFile = isFile && file.endsWith('.txt')
  const isExampleDir = !isFile && file.includes('/example')

  return isTxtFile || isExampleDir
}
