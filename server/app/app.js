const express = require('express')
    , app = express()
    , fs = require('fs')
    , path = require('path')
    , appRoot = path.resolve(`${__dirname}/../../`)
    , sampleFilter = require(`${appRoot}/server/read/reader`).sampleFilter
    , sampleAverage = require(`${appRoot}/server/read/reader`).sampleAverage
    , dataFilePath = `${appRoot}/samples/data.json`;

app.get('/', (req, res) => {
    res.sendFile(`${appRoot}/client/index.html`);
});

app.use('/public', express.static(`${appRoot}/client/public`));

app.use('/vendor', express.static(`${appRoot}/bower_components`));

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

module.exports = app;
