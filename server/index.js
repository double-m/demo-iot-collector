const app = require('express')()
    , fs = require('fs')
    , path = require('path')
    , appRoot = path.resolve(__dirname)
    , sampleFilter = require('./read/reader').sampleFilter
    , sampleAverage = require('./read/reader').sampleAverage
    , dataFilePath = `${path.dirname(__dirname)}/samples/data.json`
    , port = 3000;

global.appRoot = appRoot;

app.get('/', (req, res) => {
    res.sendFile(`${path.dirname(__dirname)}/client/index.html`);
});

app.listen(port);

fs.readFile(dataFilePath, (err, data) => {
    if (err) throw err;

    const samples = JSON.parse(data.toString())
        , [ numTemperatureSamples, avgTemperature ] = getReadingsForType(samples, 'temperature');

    console.log(`${numTemperatureSamples} temperature samples`);
    console.log(`average temperature is ${avgTemperature}`);
});

function getReadingsForType(samples, type) {
    const num = sampleFilter(samples, type).length
        , avg = sampleAverage(samples, type);

    return [ num, avg ];
}

console.log(`Server listening on port ${port}`);
