import { Validator } from "../../src/utilities/Validator";
import { setTestingFlag } from "../../src/utilities/Validator";

let connection = {
  source: "5b07d410-8186-4885-81e5-22438ee07e8f",
  sourceHandle: null,
  target: "a76dcda4-d743-44d7-9df7-84407c788c9f",
  targetHandle: null,
};
let instance;

describe("Validator returns the validity of connections", () => {
  it("returns true for valid connections", () => {
    setTestingFlag(true);

    instance = {
      sourceNodeLevel: "3",
      targetNodeLevel: "2",
    };
    let validity = Validator(instance, connection);
    expect(validity).to.equal(true);
  });

  it("returns false for invalid connections", () => {
    setTestingFlag(true);

    instance = {
      sourceNodeLevel: "2",
      targetNodeLevel: "3",
    };
    let validity = Validator(instance, connection);
    expect(validity).to.equal(false);
  });

  it("returns false for identical connections", () => {
    setTestingFlag(true);

    instance = {
      sourceNodeLevel: "2",
      targetNodeLevel: "2",
    };
    let validity = Validator(instance, connection);
    expect(validity).to.equal(false);
  });

  it("returns true for specific phase to control module connection", () => {
    setTestingFlag(true);

    instance = {
      sourceNodeLevel: "2",
      targetNodeLevel: "1",
    };
    let validity = Validator(instance, connection);
    expect(validity).to.equal(true);
  });

  it("returns false for specific operation to control module connection", () => {
    setTestingFlag(true);

    instance = {
      sourceNodeLevel: "3",
      targetNodeLevel: "1",
    };
    let validity = Validator(instance, connection);
    expect(validity).to.equal(false);
  });
});
