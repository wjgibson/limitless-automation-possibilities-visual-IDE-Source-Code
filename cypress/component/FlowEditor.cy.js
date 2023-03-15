import FlowEditor from "../../src/Elements/FlowEditor";
//Will need to test the following:
const sequence = "[aria-label=sequence]";
const reactFlowPane = ".react-flow__pane";

describe("Does the flow editor work, can you manipulate node", () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3001/getConfig**", {
      fixture: "configurations.json",
    }).as("apiCall");
  });
  it("Checks to see if you can instantiate a node", () => {
    const mockSetShowExclamation = cy.stub();
    const dataTransfer = new DataTransfer();
    cy.viewport(550, 750);
    cy.mount(
      <FlowEditor setShowExclamation={mockSetShowExclamation}></FlowEditor>
    );
    cy.get(sequence).trigger("dragstart", { dataTransfer });
    cy.get(reactFlowPane).trigger("drop", { dataTransfer });
  });
});
