import CustomMenu from "../../src/Elements/Menu";

describe("Menu.cy.js", () => {
  it("Menu mounts correctly", () => {
    cy.mount(<CustomMenu></CustomMenu>);
  });
});
