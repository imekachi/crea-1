/**
 * Thank you
 * - https://www.youtube.com/watch?v=pVfj6mxhdMw
 * - https://www.youtube.com/watch?v=cWNEl4HE2OE
 */
function trainRoute(routeGraph, departure, arrival) {
  // Initialize the queue with the departure station
  const queue = [departure]
  // Cache for visited stations so we don't have to visit it again and might cause an infinite loop
  const visitedStations = new Set()

  // Fastest time from the departure station to another
  // initialized with departure value: 0 (because it doesn't take any time)
  const duration = { [departure]: 0 }
  // Least stops from departure to another
  // initialized with departure value: -1 because when you travel 1 hop, it's 0 stop
  const stops = { [departure]: -1 }

  // Loop until there is nothing in the queue
  while (queue.length > 0) {
    // Take first station in the queue(removed from the queue)
    const currentStation = queue.shift()
    // Get its neighbor stations from the graph
    const neighbors = routeGraph.get(currentStation)
    // If it has no neighbor, just skip and do the next queue
    if (!neighbors) continue

    // Loop through the neighbor stations
    neighbors.forEach((time, neighborStation) => {
      const existingDuration = duration[neighborStation]
      const totalDuration = duration[currentStation] + time

      // If there is no recode how much does it take to this station
      // or the total time to this station is less that the recorded one
      if (existingDuration === undefined || totalDuration < existingDuration) {
        // overwrite the totalDuration
        duration[neighborStation] = totalDuration
        // also save how much stops does it take to here
        stops[neighborStation] = stops[currentStation] + 1
      }

      // If we haven't visited this station
      if (!visitedStations.has(neighborStation)) {
        // Save it to the queue, we will visit it later
        queue.push(neighborStation)
        // Save to the visited station
        visitedStations.add(neighborStation)
      }
    })
  }

  // After creating all information about the graph
  // if there is no duration information, it means that it's impossible to go there
  if (duration[arrival] === undefined) {
    return null
  }

  // Else, return the stops and time
  return { stops: stops[arrival], duration: duration[arrival] }
}

function generateGraph(routeCSVStr) {
  const trainRouteGraph = new Map()
  routeCSVStr.split(/\n/).forEach(data => {
    const [start, end, time] = data.split(',')
    if (trainRouteGraph.has(start)) {
      trainRouteGraph.set(start, trainRouteGraph.get(start).set(end, parseInt(time, 10)))
    } else {
      const neighbors = new Map()
      neighbors.set(end, parseInt(time, 10))
      trainRouteGraph.set(start, neighbors)
    }
  })

  return trainRouteGraph
}

module.exports = {
  trainRoute,
  generateGraph,
}
