import FlowEditor from "../../src/Elements/FlowEditor";
import sequenceNode from "../../src/Elements/SequenceNode";
//Will need to test the following:
const description = "[aria-label=description]";
const sequence = "[aria-label=sequence]";
const controlModule = "[aria-label=controlModule]";
const reactFlowPane = ".react-flow__pane";

describe("Does the flow editor work, can you manipulate node", () => {
  it("Checks to see if you can instantiate a node", () => {
    const dataTransfer = new DataTransfer();
    cy.viewport(550, 750);
    cy.mount(<FlowEditor></FlowEditor>);
    cy.get(sequence).trigger("dragstart", { dataTransfer });
    cy.get(reactFlowPane).trigger("drop", { dataTransfer });
  });

  it("Can you move a node", () => {
    const dataTransfer = new DataTransfer();
    cy.viewport(550, 750);
    cy.mount(<FlowEditor></FlowEditor>);
    cy.get(sequence).trigger("dragstart", { dataTransfer });
    cy.get(reactFlowPane).trigger("drop", { dataTransfer });
    cy.get(".ant-card-head-title > div").trigger("dragstart", { dataTransfer });
    cy.get(".react-flow__controls-fitview").trigger("drop", { dataTransfer });
  });
});
