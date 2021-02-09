# Train Routes CLI App
Calculate fastest route from station to station

## Installation
```sh
> git clone https://github.com/imekachi/crea-1.git
> cd crea-1
> yarn
```

## Quick Start
You can use the example routes file 'routes.csv'

```sh
> node index.js --file=routes.csv
? Departure station? > A
? Arrival station? > C
Your trip from A to C includes 1 stops and will take 10 minutes.
```
Or you can use your route csv file
```sh
> node index.js --file=path/to/your/routes.csv
```

