import FlowEditor from "../../src/Elements/FlowEditor";
import ControlModuleNode from "../../src/Elements/ControlModuleNode";

//Will need to test the following:
//Color change
//SeqType change
//Title change

describe("ControlModuleNode.cy.js", () => {
  it("ControlModuleNode mounts correctly", () => {
    cy.mount(
      <FlowEditor>
        <ControlModuleNode></ControlModuleNode>
      </FlowEditor>
    );
  });
});
