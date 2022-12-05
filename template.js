const fs = require('fs')
const expected1 = null
const expected2 = null

const example = fs.readFileSync('./example.txt', 'utf8').split('\n')
const input = fs.readFileSync('./input.txt', 'utf8').split('\n')

function solvePart1(input) {
  return null
}

function solvePart2(input) {
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
