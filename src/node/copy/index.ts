// import fs from 'node:fs'
import fsExtra from 'fs-extra'

export function copy(from: string, to: string) {
  fsExtra.copy(from, to, { filter: (file) => {
    // console.log(file)
    const isFile = fsExtra.statSync(file).isFile()
    const isTsFile = isFile && file.endsWith('.ts')
    const isExampleDir = !isFile
    return isTsFile || isExampleDir
    // return true
  } })
}

// copy('src/node/copy', 'src/c', '.ts')
