const request = require("supertest")("http://localhost:3001/");
const expect = require("chai").expect;

describe("getAllConfigsTest not", () => {
  it("should return a json object", () => {
    return request.get("getAllConfigsTest").then((res) => {
      expect(res.body.data).not.to.be.empty;
    });
  });
});
