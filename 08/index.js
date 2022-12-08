const fs = require('fs')
const expected1 = 21
const expected2 = 8

const example = fs.readFileSync('./example.txt', 'utf8').split('\n')
const input = fs.readFileSync('./input.txt', 'utf8').split('\n')

function solvePart1(input) {
  input = input.map((line) => line.trim().split(''))

  let visible = new Array(input.length)
    .fill(0)
    .map(() => new Array(input[0].length).fill(0))

  // Look at all 4 directions

  // Left to right
  for (let i = 0; i < input.length; i++) {
    visible[i][0] = 1

    let current = input[i][0]
    for (let j = 1; j < input[0].length; j++) {
      if (input[i][j] > current) {
        visible[i][j] = 1
        current = input[i][j]
      }
    }
  }

  // Right to left
  for (let i = 0; i < input.length; i++) {
    visible[i][input[0].length - 1] = 1

    let current = input[i][input[0].length - 1]
    for (let j = input[0].length - 2; j >= 0; j--) {
      if (input[i][j] > current) {
        visible[i][j] = 1
        current = input[i][j]
      }
    }
  }

  // Top to bottom
  for (let j = 0; j < input[0].length; j++) {
    visible[0][j] = 1

    let current = input[0][j]
    for (let i = 1; i < input.length; i++) {
      if (input[i][j] > current) {
        visible[i][j] = 1
        current = input[i][j]
      }
    }
  }

  // Bottom to top
  for (let j = 0; j < input[0].length; j++) {
    visible[input.length - 1][j] = 1

    let current = input[input.length - 1][j]
    for (let i = input.length - 2; i >= 0; i--) {
      if (input[i][j] > current) {
        visible[i][j] = 1
        current = input[i][j]
      }
    }
  }

  // Sum visible
  let sum = 0
  for (let i = 0; i < visible.length; i++) {
    for (let j = 0; j < visible[0].length; j++) {
      sum += visible[i][j]
    }
  }

  return sum
}

function solvePart2(input) {
  input = input.map((line) => line.trim().split(''))

  let maxScore = 0

  // Look at all 4 directions

  // Left to right
  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[0].length - 1; j++) {
      const selfHeight = input[i][j]

      let up = 0
      let down = 0
      let left = 0
      let right = 0

      // Up

      for (let k = i - 1; k >= 0; k--) {
        up++
        if (selfHeight <= input[k][j]) {
          break
        }
      }

      // Down
      for (let k = i + 1; k < input.length; k++) {
        down++
        if (selfHeight <= input[k][j]) {
          break
        }
      }

      // Left
      for (let k = j - 1; k >= 0; k--) {
        left++
        if (selfHeight <= input[i][k]) {
          break
        }
      }

      // Right
      for (let k = j + 1; k < input[0].length; k++) {
        right++
        if (selfHeight <= input[i][k]) {
          break
        }
      }

      const score = up * down * left * right
      if (score > maxScore) {
        maxScore = score
      }
    }
  }

  return maxScore
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
