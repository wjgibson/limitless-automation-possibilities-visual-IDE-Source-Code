import SRControls from "../../src/Elements/SRControls";

describe("SRControls.cy.js", () => {
  const saveButton = "[aria-label=save]";
  const restoreButton = "[aria-label=restore]";

  it("SRControls mount correctly", () => {
    cy.mount(<SRControls></SRControls>);
  });

  it("Save button has text", () => {
    cy.mount(<SRControls></SRControls>);

    cy.get(saveButton).should("have.text", "save");
  });

  it("Restore button has text", () => {
    cy.mount(<SRControls></SRControls>);

    cy.get(restoreButton).should("have.text", "restore");
  });
});
