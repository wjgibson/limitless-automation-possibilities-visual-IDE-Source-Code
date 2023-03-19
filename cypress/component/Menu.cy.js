import CustomMenu from "../../src/Elements/Menu";
import React from "react";
import { mount } from "cypress/react18";

describe("CustomMenu", () => {
  beforeEach(() => {
    const setSelectedConfig = cy.stub().as("setSelectedConfig");
    const getConfigurations = cy.spy().as("getConfigurations");
    const save = cy.stub().as("save");
    const deleteConfig = cy.stub().as("deleteConfig");
    const insert = cy.stub().as("insert");
    const addToOpen = cy.stub().as("addToOpen");

    cy.intercept("http://localhost:3001/getAll**", {
      fixture: "configurations.json",
    }).as("apiCall");

    mount(
      <CustomMenu
        selectedConfig="123"
        getConfigurations={getConfigurations}
        setSelectedConfig={setSelectedConfig}
        save={save}
        delete={deleteConfig}
        insert={insert}
        addToOpen={addToOpen}
      />
    );
  });

  it("gets the data from the API", () => {
    cy.wait("@apiCall").then((interception) => {
      assert.isNotNull(interception.response.body, "1st API call has data");
    });
  });

  it("should render with default props", () => {
    cy.get("[data-cy=CustomMenu]").should("exist");
  });

  it("should call getConfigurations on mount", () => {
    cy.stub(React, "useEffect").callThrough().as("useEffect");
    cy.get("@useEffect").should("have.been.called");
  });

  it("should set the selected key when a menu item is clicked", () => {
    cy.wait("@apiCall");
    cy.get(".ant-menu-submenu").click();
    cy.get(".ant-menu-submenu").contains("Configuration 1").click();
    cy.get("@setSelectedConfig").should("have.been.calledOnce");
  });

  it('should call save when the "Save Configuration" menu item is clicked', () => {
    cy.wait("@apiCall");
    cy.get("[data-cy=CustomMenu] li").contains("Save Configuration").click();
    cy.get("@save").should("have.been.calledOnce");
  });

  it('should call delete when the "Delete Configuration" menu item is clicked', () => {
    cy.wait("@apiCall");
    cy.get("[data-cy=CustomMenu] li").contains("Delete Configuration").click();
    cy.get("@deleteConfig").should("have.been.calledWith", "123");
  });

  it('should call insert when the "New" menu item is clicked', () => {
    cy.wait("@apiCall");
    cy.get(".ant-menu-submenu").click();
    cy.get(".ant-menu-submenu").contains("New").click();
    cy.get("@insert").should("have.been.calledOnce");
  });
});
