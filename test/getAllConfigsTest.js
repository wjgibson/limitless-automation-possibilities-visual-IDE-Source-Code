const request = require("supertest")("http://localhost:3001/");
const expect = require("chai").expect;

describe("getAllConfigsTest not empty", () => {
  it("should return a json object", () => {
    return request.get("getAllConfigsTest").then((res) => {
      expect(res.body).not.to.be.empty;
    });
  });
});
