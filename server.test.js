var request = require('supertest');
var app = require('./server.js')

describe('Hello World Test', () => {
    test("Get Hello World", done => {
        request(app)
            .get("/api/hello")
            .then(response => {
                console.log("Hello World Test Results - " + response.text);
                expect(response.statusCode).toBe(200);
                done();
            })
    })
});

describe('Test a date with the timestamp API', () => {
    test("Input: 2000-10-14", done => {
        request(app)
            .get("/api/timestamp/2015-12-25")
            .then(response => {
                console.log(response);
                expect(response.body).toStrictEqual({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
                done();
            })
    });
    test("Input: 1451001600000", done => {
        request(app)
            .get("/api/timestamp/1451001600000")
            .then(response => {
                expect(response.body).toStrictEqual({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
                done();
            })
    })
    test("Input: dd", done => {
        request(app)
            .get("/api/timestamp/dd")
            .then(response => {
                expect(response.body).toStrictEqual({"error": "Invalid Date"});
                done();
            })
    })
});
/*

describe('Test a regular date', () => {
    test("Input: \"2000-10-14\"", () => {
        return request(app)
            .get('/api/timestamp/5555')
            .then(response => {
                expect(response.json == {"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
            })
    })
});*/
