const { generateGraph, trainRoute } = require('./trainRoute')
const fs = require('fs')
const path = require('path')

const cliQuestions = [
  {
    type: 'text',
    name: 'departure',
    message: 'Departure station?'
  },
  {
    type: 'text',
    name: 'arrival',
    message: 'Arrival station?'
  }
]


;(async () => {
  const cliArgs = require('minimist')(process.argv.slice(2))
  if (!cliArgs.file) {
    return console.log('Please enter train route data by using --file=[[filePath]]')
  }

  let routeDataStr
  try {
    routeDataStr = fs.readFileSync(path.join(__dirname, cliArgs.file)).toString()
  } catch (err) {
    return console.log('Please check your path to route file if it exists.')
  }

  const trainGraph = generateGraph(routeDataStr)
  const { departure, arrival } = await require('prompts')(cliQuestions)
  const routeResult = trainRoute(trainGraph, departure, arrival)
  if (!routeResult) {
    return console.log(`There is no routes from ${departure} to ${arrival}.`)
  }
  return console.log(`Your trip from ${departure} to ${arrival} includes ${routeResult.stops} stops and will take ${routeResult.duration} minutes.`)
})()

