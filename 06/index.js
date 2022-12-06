const fs = require('fs')
const expected1 = 7
const expected2 = 19

const example = fs.readFileSync('./example.txt', 'utf8')
const input = fs.readFileSync('./input.txt', 'utf8')

function solvePart1(input) {
  for (let i = 0; i < input.length - 3; i++) {
    if (new Set(input.substring(i, i + 4)).size === 4) {
      return i + 4
    }
  }

  return null
}

function solvePart2(input) {
  for (let i = 0; i < input.length - 13; i++) {
    if (new Set(input.substring(i, i + 14)).size === 14) {
      return i + 14
    }
  }

  return null
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
