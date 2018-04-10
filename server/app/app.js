const express = require('express')
    , app = express()
    , http = require('http').Server(app)
    , io = require('socket.io')(http)
    , bodyParser = require('body-parser')
    , path = require('path')
    , appRoot = path.resolve(`${__dirname}/../../`)
    , dataFilePath = `${appRoot}/samples/data.json`
    , dataType = 'temperature'
    , dataRepository = require(`${appRoot}/server/domain/data-repository`)({dataFilePath: dataFilePath, type: dataType});

app.use(bodyParser.json());

app.use('/public', express.static(`${appRoot}/client/public`));

app.use('/vendor', express.static(`${appRoot}/bower_components`));

app.get('/', (req, res) => {
    res.sendFile(`${appRoot}/client/index.html`);
});

app.post('/upload', (req, res) => {
    if (typeof req.body === 'object') {
        dataRepository.write(req.body, notify);
    }
    res.send();
});

io.on('connection', (socket) => {
    dataRepository.read(notify);
});

const notify = (data) => {
    io.emit(dataType, JSON.stringify(data));
};

module.exports = http;
