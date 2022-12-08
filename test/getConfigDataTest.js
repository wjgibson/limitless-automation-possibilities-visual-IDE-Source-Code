const request = require("supertest")("http://localhost:3001/");
const expect = require("chai").expect;
const cid = "b14f2a7d-075a-49a8-81d6-45c77427c009";

describe("getAllConfigsTest not empty", () => {
  it("should return a json object", () => {
    return request.get(`getConfigDataTest:${cid}`).then((res) => {
      expect(res.body).not.to.be.empty;
    });
  });
});
