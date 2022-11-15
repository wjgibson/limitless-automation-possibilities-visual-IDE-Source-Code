import DnDFlow from "../../src/App/DnDFlow";

describe("reactflow.cy.js", () => {
  // const rfProvider = "[aria-label=rfProvider]";

  it("DnDFlow mounts correctly", () => {
    cy.mount(<DnDFlow></DnDFlow>);
  });

  // cy.get(rfProvider);
});
