const { trainRoute, generateGraph } = require('./trainRoute')

describe('Train Routes', () => {
  const graph = generateGraph(`A,B,5
B,C,5
C,D,7
A,D,15
E,F,5
F,G,5
G,H,10
H,I,10
I,J,5
G,J,20`)

  const specs = [
    {
      input: ['A', 'B'],
      output: { stops: 0, duration: 5 },
    },
    {
      input: ['A', 'C'],
      output: { stops: 1, duration: 10 },
    },
    {
      input: ['E', 'J'],
      output: { stops: 2, duration: 30 },
    },
    {
      input: ['A', 'B'],
      output: { stops: 0, duration: 5 },
    },
    {
      input: ['A', 'D'],
      output: { stops: 0, duration: 15 },
    },
    {
      input: ['A', 'J'],
      output: null,
    },
  ]

  specs.forEach(({ input, output }) => {
    it(`should return ${output} when passing ${JSON.stringify(input)}`, () => {
      expect(trainRoute(graph, ...input)).toEqual(output)
    })
  })
})
