# Demo IOT Collector

## Description

Example of a Node.js app receving samples via HTTP POST and showing aggregated data to the browser via socket.io

## Get started

```
git clone https://github.com/double-m/demo-iot-collector.git
cd demo-iot-collector
yarn install
bower install
yarn run test
yarn start # nodemon
curl -XPOST http://localhost:3000/upload -H 'Content-Type: application/json' --data '{"pressure": 1000, "temperature": 25}'
```
