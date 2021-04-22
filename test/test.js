var expect = require("chai").expect;
var request = require("request");

describe("Status and content", function () {
  describe("Landing page", function () {
    it("Verify 200 respnse", function (done) {
      request("http://localhost:3000", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Show information for given VIN", function () {
    it("Verify 200 respnse", function (done) {
      const body = { vin: "3N1AB6AP7BL729215" }
      request.post("http://localhost:3000/data", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Show information for all manufacturers", function () {
    it("Verify 200 respnse", function (done) {
      request("http://localhost:3000/all_manufacturers", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Show manufacturers Second page only", function () {
    it("Verify 200 respnse", function (done) {
      const body = { page: 2 }
      request("http://localhost:3000/all_manufacturers", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Show information for all makes", function () {
    it("Verify 200 respnse", function (done) {
      request("http://localhost:3000/all_makes", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Show information for honda only", function () {
    it("Verify 200 respnse", function (done) {
      const body = { manufacturer: "honda" }
      request.post("http://localhost:3000/all_makes", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
