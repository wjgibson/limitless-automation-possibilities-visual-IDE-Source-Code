describe("MainPage", () => {
  beforeEach(() => {
    cy.intercept("POST", "createNewConfig", {
      statusCode: 200,
      body: {
        message: "Config created successfully",
      },
    }).as("createNewConfig");

    cy.intercept("POST", "deleteConfig", {
      statusCode: 200,
      body: {
        message: "Config deleted successfully",
      },
    }).as("deleteConfig");
  });

  it("should open a new configuration tab", () => {
    cy.visit("http://localhost:3000");
    cy.get("button[data-testid='new-config']").click();
    cy.get("input[placeholder='Enter the new configuration name']").type(
      "My Config"
    );
    cy.get("button[type='submit']").click();
    cy.wait("@createNewConfig");
    cy.get("div[role='tab'][aria-selected='true']").should(
      "have.text",
      "My Config"
    );
  });

  it("should close a configuration tab", () => {
    cy.visit("http://localhost:3000");
    cy.get("button[data-testid='new-config']").click();
    cy.get("input[placeholder='Enter the new configuration name']").type(
      "My Config"
    );
    cy.get("button[type='submit']").click();
    cy.wait("@createNewConfig");
    cy.get("button[aria-label='close']").click();
    cy.get("div[role='tab']").should("have.length", 0);
  });

  it("should delete a configuration", () => {
    cy.visit("http://localhost:3000");
    cy.get("button[data-testid='new-config']").click();
    cy.get("input[placeholder='Enter the new configuration name']").type(
      "My Config"
    );
    cy.get("button[type='submit']").click();
    cy.wait("@createNewConfig");
    cy.get("button[aria-label='delete']").click();
    cy.get("button.ant-btn-primary").click();
    cy.wait("@deleteConfig");
    cy.get("div[role='tab']").should("have.length", 0);
  });
});
