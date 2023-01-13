import FlowEditor from "../../src/Elements/FlowEditor";

//Will need to test the following:

it("DnDFlow mounts correctly", () => {
  cy.mount(<FlowEditor></FlowEditor>);
});
