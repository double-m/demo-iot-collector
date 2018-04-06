function sampleFilter(samples, type) {
    return samples.filter(sample => {
        return Object.keys(sample).includes(type);
    });
}

function sampleAverage(samples, type) {
    const filteredSamples = sampleFilter(samples, type)
        , sum = filteredSamples.map(sample => {
                return sample[type];
            }).reduce((prev, curr) => {
                return (prev + curr);
            }, 0)
        , num = filteredSamples.length;

    return sum / num;
}

module.exports = {
    sampleFilter,
    sampleAverage
}