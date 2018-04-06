const request = require('supertest')
  , path = require('path')
  , appRoot = path.dirname(`${__dirname}/../../`)
  , app = require(`${appRoot}/server/app/app`);

describe('Test the root path', () => {
    test('It should respond 200 when GET /', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
