const request = require("supertest")("http://localhost:3001/");
const expect = require("chai").expect;
const cid = "b14f2a7d-075a-49a8-81d6-45c77427c009";

describe("updateConfigTest success", () => {
  it("should return a 200 status", () => {
    const json = {
      jsonData: { viewportInitialized: true },
      cid: cid,
    };
    return request
      .post("updateConfigTest")
      .send(json)
      .then((res) => {
        expect(res.statusCode).to.be.eql(200);
      });
  });
});
