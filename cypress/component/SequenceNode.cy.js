import React from "react";
import SequenceNode from "../../src/Elements/SequenceNode";
import { ReactFlowProvider } from "reactflow";

describe("ControlModuleNode component", () => {
  const data = {
    configId: 1,
    type: "Type 1",
  };

  beforeEach(() => {
    cy.intercept("http://localhost:3001/**", {
      fixture: "sequenceTypes.json",
    }).as("apiCall");
    cy.stub(React, "useEffect").callThrough().as("useEffect");
    cy.mount(
      <ReactFlowProvider>
        <SequenceNode data={data} />
      </ReactFlowProvider>
    );
  });

  it("renders the component", () => {
    cy.get(".drag-handle h3").should("have.text", "Sequence");
  });

  it("gets the data from the API", () => {
    cy.wait("@apiCall").then((interception) => {
      assert.isNotNull(interception.response.body, "1st API call has data");
    });
  });

  it("updates the controlModuleType state", () => {
    cy.wait("@apiCall");
    cy.get(".ant-select-selector").should("be.visible").click();
    cy.get(".ant-select-selector").contains(/Type/).click();
    cy.get("@useEffect").should("have.been.called");
  });
});
