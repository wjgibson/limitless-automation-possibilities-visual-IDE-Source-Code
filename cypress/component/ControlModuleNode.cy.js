import DnDFlow from "../../src/App/DnDFlow";
import ControlModuleNode from "../../src/Elements/ControlModuleNode";

describe("ControlModuleNode.cy.js", () => {
  it("ControlModuleNode mounts correctly", () => {
    cy.mount(
      <DnDFlow>
        <ControlModuleNode></ControlModuleNode>
      </DnDFlow>
    );
  });
});
