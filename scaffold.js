const fs = require('fs')

// Get day from args
const day = process.argv[2]

// If day is not a number, exit
if (isNaN(day)) {
  console.log('Please provide a day number')
  process.exit(1)
}

// Padday with 0
const paddedDay = day.padStart(2, '0')

// If folder doesn't exist, create it
if (!fs.existsSync(paddedDay)) {
  fs.mkdirSync(paddedDay)
}

// If index.js doesn't exist, create it from template.js
if (!fs.existsSync(`${paddedDay}/index.js`)) {
  fs.copyFileSync('template.js', `${paddedDay}/index.js`)
}

// If input.txt doesn't exist, create it
if (!fs.existsSync(`${paddedDay}/input.txt`)) {
  fs.writeFileSync(`${paddedDay}/input.txt`, '')
}

// If example.txt doesn't exist, create it
if (!fs.existsSync(`${paddedDay}/example.txt`)) {
  fs.writeFileSync(`${paddedDay}/example.txt`, '')
}
