const app = require('express')()
      fs = require('fs')
      path = require('path')
      dataFilePath = `${path.dirname(__dirname)}/samples/data.json`
    , port = 3000;

app.get('/', (req, res) => {
    res.sendFile(`${path.dirname(__dirname)}/client/index.html`);
});

app.listen(port);

fs.readFile(dataFilePath, (err, data) => {
    if (err) throw err;

    const samples = JSON.parse(data.toString())
        , temperatureSamples = samples.filter(sample => {
              return Object.keys(sample).includes('temperature');
          })
        , numTemperatureSamples = temperatureSamples.length
        , sumTemperatures = temperatureSamples.map(sample => {
            return sample.temperature;
          }).reduce((prev, curr) => {
              return (prev + curr);
          }, 0)
        , avgTemperature = sumTemperatures/numTemperatureSamples;

    console.log(`${numTemperatureSamples} temperature samples`);
    console.log(`average temperature is ${avgTemperature}`);
});

console.log(`Server listening on port ${port}`);
