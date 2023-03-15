import MainPage from "../../src/App/MainPage";
import React from "react";
import { mount } from "cypress/react18";

describe("MainPage", () => {
  it("Main Page shows correctly", () => {
    cy.mount(<MainPage></MainPage>);
  });

  it("should remove a config from openConfigs array if confirmed", () => {
    const config = { name: "Test Config", id: 1 };
    const openConfigs = [config];
    const setOpenConfigs = cy.stub().as("setOpenConfigs");
    mount(
      <MainPage openConfigs={openConfigs} setOpenConfigs={setOpenConfigs} />
    );

    // Stub window.confirm to return true
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(true);
    });

    // Access the removeOpenConfigs function through the component instance
    cy.get(MainPage).invoke("removeOpenConfigs", config);

    // Verify that the setOpenConfigs function was called with the new array
    cy.get("@setOpenConfigs").should("have.been.calledWith", []);
  });

  it("should not remove a config from openConfigs array if not confirmed", () => {
    const config = { name: "Test Config", id: 1 };
    const openConfigs = [config];
    const setOpenConfigs = cy.stub().as("setOpenConfigs");
    mount(
      <MainPage openConfigs={openConfigs} setOpenConfigs={setOpenConfigs} />
    );

    // Stub window.confirm to return false
    cy.window().then((win) => {
      cy.stub(win, "confirm").returns(false);
    });

    // Access the removeOpenConfigs function through the component instance
    cy.get(MainPage).invoke("removeOpenConfigs", config);

    // Verify that the setOpenConfigs function was not called
    cy.get("@setOpenConfigs").should("not.have.been.called");
  });
});
