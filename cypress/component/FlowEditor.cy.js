import FlowEditor from "../../src/Elements/FlowEditor";
//Will need to test the following:
const sequence = "[aria-label=sequence]";
const reactFlowPane = ".react-flow__pane";

describe("Does the flow editor work, can you manipulate node", () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3001/getConfig**", {
      fixture: "configurations.json",
    }).as("apiCall");
  });
  it("Checks to see if you can instantiate a node", () => {
    const mockSetShowExclamation = cy.stub();
    const dataTransfer = new DataTransfer();
    cy.viewport(550, 750);
    cy.mount(
      <FlowEditor setShowExclamation={mockSetShowExclamation}></FlowEditor>
    );
    cy.get(sequence).trigger("dragstart", { dataTransfer });
    cy.get(reactFlowPane).trigger("drop", { dataTransfer });
  });

  it("Can you move a node", () => {
    const mockSetShowExclamation = cy.stub();
    const dataTransfer = new DataTransfer();
    cy.viewport(550, 750);
    cy.mount(
      <FlowEditor setShowExclamation={mockSetShowExclamation}></FlowEditor>
    );
    cy.get(sequence).trigger("dragstart", { dataTransfer });
    cy.get(reactFlowPane).trigger("drop", { dataTransfer });
    cy.get(".ant-card-head-title > div").trigger("dragstart", { dataTransfer });
    cy.get(".react-flow__controls-fitview").trigger("drop", { dataTransfer });
  });
});

//Experimental ChatGPT Code
// describe("useEffect tests", () => {
//   beforeEach(() => {
//     // Set up any required test fixtures or mock data
//   });

//   it("should restore on mount", () => {
//     cy.wrap({ configId: "someConfigId" }).then((props) => {
//       cy.spy(props, "onRestore").as("onRestore");

//       cy.mount(<FlowEditor {...props} />);

//       cy.get("@onRestore").should(
//         "have.been.calledOnceWithExactly",
//         "someConfigId"
//       );
//     });
//   });

//   it("should save on prop change", () => {
//     cy.wrap({ save: true }).then((props) => {
//       cy.spy(props, "onSave").as("onSave");

//       cy.mount(<FlowEditor {...props} />);

//       cy.get("@onSave").should("not.have.been.called");

//       cy.wrap({ save: true }).then((newProps) => {
//         cy.get("FlowEditor").invoke("setState", newProps);

//         cy.get("@onSave").should("have.been.calledOnce");
//       });
//     });
//   });

//   it("should show exclamation on node change", () => {
//     cy.wrap({ edges: [], nodes: [{ id: "someNodeId" }] }).then((props) => {
//       cy.wrap(true).as("showExclamationOnChange");

//       cy.spy(props, "setShowExclamation").as("setShowExclamation");

//       cy.mount(
//         <FlowEditor
//           {...props}
//           showExclamationOnChange={true}
//           setShowExclamation={props.setShowExclamation}
//         />
//       );

//       cy.get("@setShowExclamation").should(
//         "have.been.calledOnceWithExactly",
//         true
//       );
//     });
//   });

//   it("should hide exclamation on showExclamtionOnChange change", () => {
//     cy.wrap({ showExclamationOnChange: false }).then((props) => {
//       cy.spy(props, "setShowExclamation").as("setShowExclamation");

//       cy.mount(<FlowEditor {...props} />);

//       cy.get("@setShowExclamation").should(
//         "have.been.calledOnceWithExactly",
//         false
//       );

//       cy.wrap({ showExclamationOnChange: true }).then((newProps) => {
//         cy.get("FlowEditor").invoke("setState", newProps);

//         cy.get("@setShowExclamation").should(
//           "have.been.calledOnceWithExactly",
//           true
//         );
//       });
//     });
//   });
// });
