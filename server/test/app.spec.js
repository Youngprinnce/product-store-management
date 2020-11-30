const chai = require('chai')
const {expect} = chai
const request = require("request")


describe('Status Routes and content', () => {
    describe('Main page', () => {
        it('status', async () => {
            request('http://localhost:3000/', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
            });
        });

        it('content', async () => {
            request('http://localhost:3000/', function (error, response, body) {
                expect(body).to.equal('Product Store API');
            });
        });
    });

    describe('Product page when not loggedIn', () => {
        it('content', async () => {
            request('http://localhost:3000/api/product', function (error, response, body) {
                const res = JSON.parse(body)
                expect(res.message).to.equal("Unauthorized access");
            });
        });
    });
});

