describe("MainPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "/**Configs**", {
      fixture: "configurations.json",
    }).as("getConfigurations");
    cy.intercept("GET", "/getConfig**", {
      fixture: "configurations.json",
    }).as("getConfigJSON");
    cy.intercept("POST", "/create**", {
      fixture: "configurations.json",
    }).as("createNewConfig");
    cy.intercept("POST", "/delete**", {
      fixture: "configurations.json",
    }).as("deleteConfig");
    cy.intercept("POST", "/**Types**", {
      fixture: "sequenceTypes.json",
    }).as("getAllSequenceTypes");

    cy.wait("@getConfigurations");
    cy.wait("@getAllSequenceTypes");
  });

  it("should intercept API calls and return fixture data", () => {
    cy.get(".ant-menu-submenu-title").click();
    cy.get(".ant-menu-item-only-child > .ant-menu-title-content").click();
    cy.get('[aria-label="sequence"]')
      .trigger("mousedown", { button: 0 })
      .wait(1500)
      .trigger("mousemove", {
        clientX: 357.75,
        clientY: 682.25,
        screenX: 1811.75,
        screenY: 799.25,
        pageX: 682.25,
        pageY: 105.8125,
      })
      .trigger("mouseup", { force: true });

    cy.get(".ant-select-selector").click();
  });
});
