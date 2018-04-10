const fs = require('fs')
    , path = require('path')
    , appRoot = path.resolve(`${__dirname}/../../`)
    , sampleFilter = require(`${appRoot}/server/read/reader`).sampleFilter
    , sampleAverage = require(`${appRoot}/server/read/reader`).sampleAverage;

class DataRepository {

    constructor(configuration) {
        const typeOfConfiguration = typeof configuration;

        if (typeOfConfiguration !== 'object') {
            throw new Error(`configuration must be an object: ${typeOfConfiguration} was given`);
        }

        if ('dataFilePath' in configuration) {
            this.dataFilePath = configuration.dataFilePath;
        }

        if ('type' in configuration) {
            this.type = configuration.type;
        }
    }

    write(newSample, done) {
        fs.readFile(this.dataFilePath, (err, data) => {
            const samples = !err ? JSON.parse(data.toString()) : [];

            samples.push(newSample);

            fs.writeFile(this.dataFilePath, JSON.stringify(samples), (err) => {
                if (err) throw err;

                this.read(done);
            })
        });
    }

    read(done) {
        fs.readFile(this.dataFilePath, (err, data) => {
            if (err) {
                data = '[]';
                fs.writeFileSync(this.dataFilePath, data);
            }

            const samples = JSON.parse(data)
            , [ num, avg ] = this.getReadingsForType(samples, this.type);

            done([ num, avg ]);
        });
    }

    getReadingsForType(samples, type) {
        const num = sampleFilter(samples, type).length
        , avg = sampleAverage(samples, type);

        return [ num, avg ];
    }
}

module.exports = (config) => new DataRepository(config);
