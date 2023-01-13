import Sidebar from "../../src/Elements/Sidebar";

describe("Sidebar.cy.js", () => {
  const description = "[aria-label=description]";
  const sequence = "[aria-label=sequence]";
  const controlModule = "[aria-label=controlModule]";

  //Mounting test//
  it("Sidebar mounts correctly", () => {
    cy.mount(<Sidebar></Sidebar>);
  });

  //Testing for onDragStart Event//

  it("sequence node draggable", () => {
    cy.mount(<Sidebar></Sidebar>);

    cy.get(sequence)
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
  });

  it("control module node draggable", () => {
    cy.mount(<Sidebar></Sidebar>);

    cy.get(controlModule)
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
  });
});
