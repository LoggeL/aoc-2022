const fs = require('fs')
const expected1 = 13140
const expected2 = `\n##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`

const example = fs.readFileSync(__dirname + '/example.txt', 'utf8').split('\n')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n')

function solvePart1(input) {
  input = input.map((line) => line.trim().split(' '))

  let X = 1
  let sum = 0
  let cycle = 0

  for (let i = 0; i < input.length; i++) {
    let [command, magnitude] = input[i]
    if (command === 'addx') {
      // add X
      cycle++
      if ((cycle - 20) % 40 === 0) {
        // console.log(1, cycle, X, cycle * X, magnitude)
        sum += X * cycle
      }
      cycle++
      if ((cycle - 20) % 40 === 0) {
        // console.log(1, cycle, X, cycle * X, magnitude)
        sum += X * cycle
      }
      X += Number(magnitude)
    } else if (command === 'noop') {
      // noop
      cycle++
      if ((cycle - 20) % 40 === 0) {
        // console.log(2, cycle, X, cycle * X, magnitude)
        sum += X * cycle
      }
    } else {
      console.error('Unknown command', command)
    }

    // console.log(command, magnitude, X, cycle)
  }

  return sum
}

function solvePart2(input) {
  input = input.map((line) => line.trim().split(' '))

  let X = 1
  let cycle = 0
  let pos = 0
  let output = '\n'

  for (let i = 0; i < input.length; i++) {
    let [command, magnitude] = input[i]
    if (command === 'addx') {
      // add X
      pos = cycle % 40
      output += Math.abs(pos - X) < 2 ? '#' : '.'
      cycle++
      if (cycle % 40 === 0) {
        output += `\n`
      }
      pos = cycle % 40
      output += Math.abs(pos - X) < 2 ? '#' : '.'
      cycle++
      if (cycle % 40 === 0) {
        output += `\n`
      }
      X += Number(magnitude)
    } else if (command === 'noop') {
      // noop
      pos = cycle % 40
      output += Math.abs(pos - X) < 2 ? '#' : '.'
      cycle++
      if (cycle % 40 === 0) {
        output += `\n`
      }
    } else {
      console.error('Unknown command', command)
    }

    // console.log(command, magnitude, X, cycle)
  }

  return output
}

const test1 = solvePart1(example)
if (test1 !== expected1) {
  console.error('Part 1: Expected', expected1, 'but got', test1)
} else {
  result1 = solvePart1(input)
  console.log('Part 1:\n', result1)
}

const test2 = solvePart2(example)
if (test2.trim() !== expected2.trim()) {
  console.error('Part 2: Expected', expected2, '\nbut got', test2)
} else {
  result2 = solvePart2(input)
  console.log('Part 2:\n', result2)
}
