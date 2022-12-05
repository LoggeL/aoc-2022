const fs = require('fs')
const expected1 = 'CMZ'
const expected2 = 'MCD'

const example = fs.readFileSync('./example.txt', 'utf8').split('\r\n')
const input = fs.readFileSync('./input.txt', 'utf8').split('\r\n')

function solvePart1(input) {
  const blockCount = (input[0].length + 1) / 4
  let stack = new Array(blockCount).fill(0).map((e) => [])
  let orderMode = false

  for (line of input) {
    if (line === '' || Number(line[1])) {
      orderMode = true
      continue
    }

    if (!orderMode) {
      for (let i = 1; i < line.length; i += 4) {
        if (line[i] === ' ') {
          continue
        }

        // Insert at the start
        stack[(i - 1) / 4].unshift(line[i])
      }
    } else {
      // move 1 from 2 to 1
      let [_, count, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/)
      // Get items from stack
      let items = stack[from - 1].splice(-1 * count)
      // Add items to stack
      stack[to - 1] = stack[to - 1].concat(items.reverse())
    }
  }

  // Get top item from each stack
  let result = stack.map((stack) => stack.slice(-1)).join('')

  return result
}

function solvePart2(input) {
  const blockCount = (input[0].length + 1) / 4
  let stack = new Array(blockCount).fill(0).map((e) => [])
  let orderMode = false

  for (line of input) {
    if (line === '' || Number(line[1])) {
      orderMode = true
      continue
    }

    if (!orderMode) {
      for (let i = 1; i < line.length; i += 4) {
        if (line[i] === ' ') {
          continue
        }

        // Insert at the start
        stack[(i - 1) / 4].unshift(line[i])
      }
    } else {
      // move 1 from 2 to 1
      let [_, count, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/)
      // Get items from stack
      let items = stack[from - 1].splice(-1 * count)
      // Add items to stack
      stack[to - 1] = stack[to - 1].concat(items)
    }
  }

  // Get top item from each stack
  let result = stack.map((stack) => stack.slice(-1)).join('')

  return result
}

const test1 = solvePart1(example)
if (test1 !== expected1) {
  console.error('Part 1: Expected', expected1, 'but got', test1)
} else {
  console.log('Test 1 passed')
  result1 = solvePart1(input)
  console.log('Part 1:\n', result1)
}

const test2 = solvePart2(example)
if (test2 !== expected2) {
  console.error('Part 2: Expected', expected2, 'but got', test2)
} else {
  console.log('Test 2 passed')
  result2 = solvePart2(input)
  console.log('Part 2:\n', result2)
}
