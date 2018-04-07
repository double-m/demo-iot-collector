const express = require('express')
    , app = express()
    , http = require('http').Server(app)
    , io = require('socket.io')(http)
    , bodyParser = require('body-parser')
    , fs = require('fs')
    , path = require('path')
    , appRoot = path.resolve(`${__dirname}/../../`)
    , sampleFilter = require(`${appRoot}/server/read/reader`).sampleFilter
    , sampleAverage = require(`${appRoot}/server/read/reader`).sampleAverage
    , dataFilePath = `${appRoot}/samples/data.json`;

app.use(bodyParser.json());

app.use('/public', express.static(`${appRoot}/client/public`));

app.use('/vendor', express.static(`${appRoot}/bower_components`));

app.get('/', (req, res) => {
    res.sendFile(`${appRoot}/client/index.html`);
});

app.post('/upload', (req, res) => {
    if (typeof req.body === 'object') {
        writeDataAndNotifyTheListeners(req.body);
    }
    res.send();
});

io.on('connection', (socket) => {
    readDataAndNotifyTheListeners();
});

function writeDataAndNotifyTheListeners(newSample) {
    fs.readFile(dataFilePath, (err, data) => {
        const samples = !err ? JSON.parse(data.toString()) : [];

        samples.push(newSample);

        fs.writeFile(dataFilePath, JSON.stringify(samples), (err) => {
            if (err) throw err;

            readDataAndNotifyTheListeners();
        })
    });
}

function readDataAndNotifyTheListeners() {
    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            data = '[]';
            fs.writeFileSync(dataFilePath, data);
        }

        const samples = JSON.parse(data)
            , [ numTemperatureSamples, avgTemperature ] = getReadingsForType(samples, 'temperature');

        io.emit('temperature', JSON.stringify([ numTemperatureSamples,avgTemperature ]));
    });
}

function getReadingsForType(samples, type) {
    const num = sampleFilter(samples, type).length
        , avg = sampleAverage(samples, type);

    return [ num, avg ];
}

module.exports = http;
