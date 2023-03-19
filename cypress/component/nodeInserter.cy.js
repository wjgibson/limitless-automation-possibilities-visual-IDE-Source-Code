import * as nodeInserter from "../../src/utilities/nodeInserter";

describe("formatting functions", () => {
  it("formats sequence data correctly", () => {
    // Define the input data
    const node = {
      id: "node1",
      data: {
        configId: "config1",
        label: "Node 1",
        type: "uuid|Type A",
      },
    };

    // Call the function with test data
    const result = nodeInserter.formatSequenceData(node);

    // Assert that the function returns the expected output
    expect(result).to.deep.equal({
      Id: "node1",
      configId: "config1",
      name: "Node 1",
      typeuuid: "uuid",
      description: "to be implemented in the future",
    });
  });

  it("formats edge data correctly", () => {
    // Define the input data
    const edge = {
      source: "node1",
      target: "node2",
    };

    // Call the function with test data
    const result = nodeInserter.formatEdgeData(edge);

    // Assert that the function returns the expected output
    expect(result).to.not.equal({
      parentNodeId: "node1",
      childNodeId: "node2",
    });
  });
});

describe("checkForType", () => {
  it('returns "insertControlModule" when node name is "controlModule node"', () => {
    // Define the input data
    const node = { name: "controlModule node" };

    // Call the function with test data
    const result = nodeInserter.checkForType(node);

    // Assert that the function returns the expected output
    expect(result).to.equal("insertControlModule");
  });

  it('returns "insertSequence" when node name is "sequence node"', () => {
    // Define the input data
    const node = { name: "sequence node" };

    // Call the function with test data
    const result = nodeInserter.checkForType(node);

    // Assert that the function returns the expected output
    expect(result).to.equal("insertSequence");
  });

  it('returns undefined when node name is not "controlModule node" or "sequence node"', () => {
    // Define the input data
    const node = { name: "unknown node" };

    // Call the function with test data
    const result = nodeInserter.checkForType(node);

    // Assert that the function returns the expected output
    expect(result).to.be.undefined;
  });
});
describe("sendReactflowData", () => {
  it("makes a POST request with the expected data", () => {
    // Define the input data
    const reactflowData = {
      jsonData: { nodes: [], edges: [] },
    };

    // Intercept the API call and verify its parameters
    cy.intercept("POST", "**/updateConfig").as("updateConfig");
    nodeInserter.sendReactflowData(reactflowData);
    cy.wait("@updateConfig").then((interception) => {
      expect(interception.request.body).to.deep.equal({
        jsonData: reactflowData.jsonData,
      });
    });
  });
});
describe("prepareNodeTables", () => {
  it("calls and intercepts the expected API requests", () => {
    cy.intercept("POST", "**/prepare**").as("prepareTable");
    nodeInserter.prepareNodeTables();
    cy.wait("@prepareTable").then((interception) => {
      console.log(interception.request.url);
      expect(interception.request.url).to.contain("prepare");
    });
  });
});
describe("sendData", () => {
  it("calls the expected API endpoints for inserting edges", () => {
    const edges = [
      {
        id: "reactflow__edge-80100499-bbac-4e74-8ea3-79488007c8dc-95e80786-d6c3-4f63-9921-38a3632319ab",
        type: "step",
        source: "80100499-bbac-4e74-8ea3-79488007c8dc",
        target: "95e80786-d6c3-4f63-9921-38a3632319ab",
        animated: true,
        sourceHandle: null,
        targetHandle: null,
      },
    ];
    cy.intercept("POST", "**/prepare**").as("prepareTable");

    nodeInserter.sendEdgeData(edges);

    cy.wait("@prepareTable", {
      timeout: 5000,
    }).then((interception) => {
      expect(interception.request.url).to.contain("prepare");
    });
  });

  it("calls the expected API endpoints for inserting nodes", () => {
    const nodes = [
      {
        id: "node1",
        data: {
          configId: "config1",
          label: "Node 1",
          type: "uuid|Type A",
        },
      },
      {
        id: "node2",
        data: {
          configId: "config1",
          label: "Node 1",
          type: "uuid|Type B",
        },
      },
    ];
    cy.intercept("POST", "**/prepare**").as("prepareTable");

    nodeInserter.sendNodeData(nodes);

    cy.wait("@prepareTable", {
      timeout: 5000,
    }).then((interception) => {
      expect(interception.request.url).to.contain("prepare");
    });
  });
});
