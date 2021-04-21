var expect = require("chai").expect;
var request = require("request");

describe("Status and content", function () {
  describe("Main page", function () {
    it("Verify 200 respnse", function (done) {
      request("http://localhost:3000/", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("About page", function () {
    it("Ensure 404 response", function (done) {
      request("http://localhost:3000/about", function (error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
