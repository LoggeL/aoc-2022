const fs = require('fs')
const expected1 = 95437
const expected2 = 24933642

const example = fs.readFileSync('./example.txt', 'utf8').split('\n')
const input = fs.readFileSync('./input.txt', 'utf8').split('\n')

function solvePart1(input) {
  let path = '/'
  let dirs = {}

  for (let i = 0; i < input.length; i++) {
    const line = input[i].trim()

    if (line.startsWith('$ cd')) {
      const dir = line.split(' ')[2].trim()

      if (dir === '..') {
        path = path.split('/').slice(0, -2).join('/') + '/'
      } else if (dir === '.') {
        continue
      } else if (dir === '/') {
        path = '/'
      } else {
        path += dir + '/'
      }
    } else if (line.startsWith('$ ls')) {
      for (let j = i + 1; j < input.length; j++) {
        const line2 = input[j].trim()
        if (line2.startsWith('$')) {
          break
        } else if (line2.startsWith('dir')) {
          continue
        } else {
          const size = Number(line2.split(' ')[0].trim())
          const file = line2.split(' ')[1].trim()
          // Add size to all root dirs
          let paths = path.split('/').filter((p) => p)
          for (let k = 0; k < paths.length + 1; k++) {
            let p = '/' + paths.slice(0, k).join('/') + '/'
            dirs[p] = dirs[p] ? dirs[p] + size : size
          }
        }
        i = j
      }
    }
  }

  // Filter dirs
  let filteredDirs = Object.values(dirs)
    .map(Number)
    .filter((dir) => dir <= 100000)

  return filteredDirs.reduce((a, b) => a + b, 0)
}

function solvePart2(input) {
  let path = '/'
  let dirs = {}

  for (let i = 0; i < input.length; i++) {
    const line = input[i].trim()

    if (line.startsWith('$ cd')) {
      const dir = line.split(' ')[2].trim()

      if (dir === '..') {
        path = path.split('/').slice(0, -2).join('/') + '/'
      } else if (dir === '.') {
        continue
      } else if (dir === '/') {
        path = '/'
      } else {
        path += dir + '/'
      }
    } else if (line.startsWith('$ ls')) {
      for (let j = i + 1; j < input.length; j++) {
        const line2 = input[j].trim()
        if (line2.startsWith('$')) {
          break
        } else if (line2.startsWith('dir')) {
          continue
        } else {
          const size = Number(line2.split(' ')[0].trim())
          const file = line2.split(' ')[1].trim()
          // Add size to all root dirs
          let paths = path.split('/').filter((p) => p)
          for (let k = 0; k < paths.length + 1; k++) {
            let p = '/' + paths.slice(0, k).join('/') + '/'
            dirs[p] = dirs[p] ? dirs[p] + size : size
          }
        }
        i = j
      }
    }
  }

  const freeSpace = 70000000 - dirs['//']

  // Filter dirs
  let filteredDirs = Object.values(dirs)
    .map(Number)
    .filter((dir) => dir >= 30000000 - freeSpace)
    .sort((a, b) => a - b)

  return filteredDirs[0]
}

const test1 = solvePart1(example)
if (test1 !== expected1) {
  console.error('Part 1: Expected', expected1, 'but got', test1)
} else {
  result1 = solvePart1(input)
  console.log('Part 1:\n', result1)
}

const test2 = solvePart2(example)
if (test2 !== expected2) {
  console.error('Part 2: Expected', expected2, 'but got', test2)
} else {
  result2 = solvePart2(input)
  console.log('Part 2:\n', result2)
}
