import DnDFlow from "../../src/App/DnDFlow";

describe("reactflow.cy.js", () => {
  // const onClickSave = cy.onSave().as("onClickSave");

  it("DnDFlow mounts correctly", () => {
    cy.mount(<DnDFlow></DnDFlow>);
  });

  // it("DNDFlow saves", () => {
  //   cy.(<DnDFlow></DnDFlow>);
  // });
});
