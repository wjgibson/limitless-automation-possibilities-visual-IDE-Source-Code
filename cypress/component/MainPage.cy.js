import MainPage from "../../src/App/MainPage";

describe("MainPage.cy.js", () => {
    it("Main Page shows correctly", () => {
      cy.mount(<MainPage></MainPage>);
    });
  });
  