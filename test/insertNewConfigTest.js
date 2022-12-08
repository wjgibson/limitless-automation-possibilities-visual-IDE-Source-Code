const request = require("supertest")("http://localhost:3001/");
const expect = require("chai").expect;
const cid = "test";

describe("insertConfigTest success", () => {
  it("should return a 200 status", () => {
    const json = {
      jsonData: { viewportInitialized: true },
      name: "test 2",
    };
    return request
      .post("insertNewConfigTest")
      .send(json)
      .then((res) => {
        expect(res.statusCode).to.be.eql(200);
      });
  });
});
