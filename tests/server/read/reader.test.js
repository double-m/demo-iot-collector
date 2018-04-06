const path = require('path')
    , appRoot = path.dirname(`${__dirname}/../../../../`)
    , sampleFilter = require(`${appRoot}/server/read/reader`).sampleFilter
    , sampleAverage = require(`${appRoot}/server/read/reader`).sampleAverage;

describe('Test the root path', () => {
    test('sampleFilter', () => {
        samples = [
            { temperature: 2 },
            { pressure: 1012 },
            { pressure: 1013, temperature: 4 }
        ];

        expect(sampleFilter(samples, 'temperature')).toEqual([
            { temperature: 2 },
            { pressure: 1013, temperature: 4 }
        ]);
    });

    test('sampleAverage integer', () => {
        samples = [
            { temperature: 2 },
            { pressure: 1012 },
            { pressure: 1013, temperature: 4 }
        ];

      expect(sampleAverage(samples, 'temperature')).toBe(3);
    });

    test('sampleAverage float', () => {
        samples = [
            { temperature: 2 },
            { pressure: 1012 },
            { pressure: 1013, temperature: 3 }
        ];

      expect(sampleAverage(samples, 'temperature')).toBeCloseTo(2.5);
    });
});
