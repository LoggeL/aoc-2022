const fs = require('fs')
const expected1 = 10605
const expected2 = 2713310158

const example = fs.readFileSync(__dirname + '/example.txt', 'utf8').split('\n')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n')

function solvePart1(input) {
  let monkeys = []

  for (let i = 0; i < input.length; i = i + 7) {
    let items = input[i + 1].match(/(\d+)/g).map(Number)
    let operation = input[i + 2].replace('Operation: new =', '')
    let divisible = Number(input[i + 3].split(' ').pop().trim())
    let trueCase = Number(input[i + 4].split(' ').pop().trim())
    let falseCase = Number(input[i + 5].split(' ').pop().trim())

    monkeys.push({
      items,
      operation: eval('(old) => ' + operation),
      divisible,
      trueCase ,
      falseCase,
      count: 0
    })
  }

  let rounds = 20
  for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      for (let k = 0; k < monkeys[j].items.length; k++) {
        if (monkeys[j].items.length === 0) break
        let item = monkeys[j].items[k]
        // Remove the item
        monkeys[j].items.splice(k, 1)
        k--
        let newNumber = monkeys[j].operation(item)

        monkeys[j].count++

        // Default op (number // 3)
        newNumber = parseInt(newNumber / 3)

        if (newNumber % monkeys[j].divisible === 0) {
          monkeys[monkeys[j].trueCase].items.push(newNumber)
        } else {
          monkeys[monkeys[j].falseCase].items.push(newNumber)
        }
        
      }
    }
  }

  // Sort by count desc
  monkeys.sort((a, b) => b.count - a.count)

  // Get the first 2 monkeys
  let firstMonkey = monkeys[0]
  let secondMonkey = monkeys[1]
  
  return firstMonkey.count * secondMonkey.count
}

function solvePart2(input) {
  let monkeys = []

  for (let i = 0; i < input.length; i = i + 7) {
    let items = input[i + 1].match(/(\d+)/g).map(Number)
    let operation = input[i + 2].replace('Operation: new =', '')
    let divisible = Number(input[i + 3].split(' ').pop().trim())
    let trueCase = Number(input[i + 4].split(' ').pop().trim())
    let falseCase = Number(input[i + 5].split(' ').pop().trim())

    monkeys.push({
      items,
      operation: eval('(old) => ' + operation),
      divisible,
      trueCase ,
      falseCase,
      count: 0
    })
  }

  const maxDivisor = monkeys.reduce((max, monkey) => max * monkey.divisible, 1)
  const rounds = 10000

  for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      for (let k = 0; k < monkeys[j].items.length; k++) {
        if (monkeys[j].items.length === 0) break
        let item = monkeys[j].items[k]
        // Remove the item
        monkeys[j].items.splice(k, 1)
        k--
        let newNumber = monkeys[j].operation(item)

        newNumber = newNumber % maxDivisor

        monkeys[j].count++

        if (newNumber % monkeys[j].divisible === 0) {
          monkeys[monkeys[j].trueCase].items.push(newNumber)
        } else {
          monkeys[monkeys[j].falseCase].items.push(newNumber)
        }
        
      }
    }
  }

  // Sort by count desc
  monkeys.sort((a, b) => b.count - a.count)

  // Get the first 2 monkeys
  let firstMonkey = monkeys[0]
  let secondMonkey = monkeys[1]
  
  return firstMonkey.count * secondMonkey.count
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
