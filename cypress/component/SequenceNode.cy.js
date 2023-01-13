import FlowEditor from "../../src/Elements/FlowEditor";
import SequenceNode from "../../src/Elements/SequenceNode";

//Will need to test the following:
//

describe("SequenceNode.cy.js", () => {
  it("SequenceNode mounts correctly", () => {
    cy.mount(
      <FlowEditor>
        <SequenceNode></SequenceNode>
      </FlowEditor>
    );
  });
});
