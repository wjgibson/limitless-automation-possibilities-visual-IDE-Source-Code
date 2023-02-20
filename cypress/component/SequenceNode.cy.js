import SequenceNode from "../../src/Elements/SequenceNode";
import FlowEditor from "../../src/Elements/FlowEditor";
import { mount } from "cypress/react";

// Will need to test the following:
//
describe("SequenceNode Mounts", () => {
  let selector = `[aria-label=seqTypeSelectMenu]`;
  it("mounts", () => {
    cy.mount(
      <FlowEditor>
        <SequenceNode />
      </FlowEditor>
    );
  });

  it("has option to ", () => {
    function MockSelector() {
      selector = selector;
      return null;
    }
    cy.mount(<MockSelector></MockSelector>);

    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/get*",
      },
      []
    ).as("getConfigJSON");
  });
});
