const fs = require('fs')
const expected1 = 13
const expected2 = 36

const example = fs.readFileSync(__dirname + '/example.txt', 'utf8').split('\n')
const example2 = fs
  .readFileSync(__dirname + '/example2.txt', 'utf8')
  .split('\n')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf8').split('\n')

function solvePart1(input) {
  input = input.map((line) => line.trim().split(' '))

  let visited = new Array(1000).fill(0).map(() => new Array(1000).fill(0))

  let xH = 500
  let yH = 500

  let xH_old = 500
  let yH_old = 500

  let xT = 500
  let yT = 500

  visited[yT][xT] = 1

  for (let i = 0; i < input.length; i++) {
    let [direction, magnitude] = input[i]
    magnitude = parseInt(magnitude)

    // console.log('Direction:', direction, 'Magnitude:', magnitude)

    for (let j = 0; j < magnitude; j++) {
      // Move Head
      switch (direction) {
        case 'U':
          yH += 1
          break
        case 'D':
          yH -= 1
          break
        case 'L':
          xH -= 1
          break
        case 'R':
          xH += 1
          break
      }

      // Move Tail
      const dx = xH - xT
      const dy = yH - yT

      // Horizontal & Vertical
      if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
        // console.log('Nothing')
        // Nothing
      } else if (
        (Math.abs(dx) == 2 && Math.abs(dy) == 0) ||
        (Math.abs(dx) == 0 && Math.abs(dy) == 2)
      ) {
        // console.log('Straight')
        xT = xH_old
        yT = yH_old
      } else {
        // Diagonal
        // console.log('Diagonal')
        switch (direction) {
          case 'U':
            xT = xH
            yT = yH - 1
            break
          case 'D':
            xT = xH
            yT = yH + 1
            break
          case 'L':
            xT = xH + 1
            yT = yH
            break
          case 'R':
            xT = xH - 1
            yT = yH
            break
        }
      }

      xH_old = xH
      yH_old = yH

      visited[yT][xT] = 1
    }
  }

  // Sum visited
  let sum = 0
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[0].length; j++) {
      sum += visited[i][j]
    }
  }

  return sum
}

function moveElement(xH, yH, xT, yT, xH_old, yH_old) {
  // Move Tail
  const dx = xH - xT
  const dy = yH - yT

  // Horizontal & Vertical
  if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
    // console.log('Nothing')
    // Nothing
  } else if (
    (Math.abs(dx) == 2 && Math.abs(dy) == 0) ||
    (Math.abs(dx) == 0 && Math.abs(dy) == 2)
  ) {
    // console.log('Straight')
    xT = xH_old
    yT = yH_old
  } else {
    const direction = dx == 2 ? 'R' : dx == -2 ? 'L' : dy == 2 ? 'U' : 'D'

    // Diagonal
    // console.log('Diagonal')
    switch (direction) {
      case 'U':
        xT = xH
        yT = yH - 1
        break
      case 'D':
        xT = xH
        yT = yH + 1
        break
      case 'L':
        xT = xH + 1
        yT = yH
        break
      case 'R':
        xT = xH - 1
        yT = yH
        break
    }
  }

  return [xT, yT]
}

function solvePart2(input) {
  input = input.map((line) => line.trim().split(' '))

  let visited = new Array(1000).fill(0).map(() => new Array(1000).fill(0))

  let xH = new Array(9).fill(500)
  let yH = new Array(9).fill(500)

  let xH_old = new Array(9).fill(500)
  let yH_old = new Array(9).fill(500)

  let xT = new Array(9).fill(500)
  let yT = new Array(9).fill(500)

  visited[yT[8]][xT[8]] = 1

  for (let i = 0; i < input.length; i++) {
    let [direction, magnitude] = input[i]
    magnitude = parseInt(magnitude)

    // console.log('Direction:', direction, 'Magnitude:', magnitude)

    for (let j = 0; j < magnitude; j++) {
      // Move Head
      switch (direction) {
        case 'U':
          yH[0] += 1
          break
        case 'D':
          yH[0] -= 1
          break
        case 'L':
          xH[0] -= 1
          break
        case 'R':
          xH[0] += 1
          break
      }
      for (let k = 0; k < 9; k++) {
        ;[xT_k, yT_k] = moveElement(
          xH[k],
          yH[k],
          xT[k],
          yT[k],
          xH_old[k],
          yH_old[k]
        )

        xH_old[k] = xH[k]
        yH_old[k] = yH[k]

        yH[k + 1] = yT_k
        xH[k + 1] = xT_k

        yT[k] = yT_k
        xT[k] = xT_k
      }
      visited[yT[8]][xT[8]] = 1
    }
  }

  // Sum visited
  let sum = 0
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[0].length; j++) {
      sum += visited[i][j]
    }
  }

  return sum
}

const test1 = solvePart1(example)
if (test1 !== expected1) {
  console.error('Part 1: Expected', expected1, 'but got', test1)
} else {
  console.log('Test 1: OK')
  result1 = solvePart1(input)
  console.log('Part 1:\n', result1)
}

const test2 = solvePart2(example2)
if (test2 !== expected2) {
  console.error('Part 2: Expected', expected2, 'but got', test2)
} else {
  console.log('Test 2: OK')
  result2 = solvePart2(input)
  console.log('Part 2:\n', result2)
}
