const request = require("supertest")("http://localhost:3001/");
const expect = require("chai").expect;
const cid = "b14f2a7d-075a-49a8-81d6-45c77427c009";

//This will be integration testing for the API
//To test each endpoint: Make the destructive call, expect a 20-=0 status code,
//and expect the body to equal the json data you just inserted.
