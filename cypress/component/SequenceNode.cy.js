import DnDFlow from "../../src/App/DnDFlow";
import SequenceNode from "../../src/Elements/SequenceNode";

describe("SequenceNode.cy.js", () => {
  it("SequenceNode mounts correctly", () => {
    cy.mount(
      <DnDFlow>
        <SequenceNode></SequenceNode>
      </DnDFlow>
    );
  });
});
