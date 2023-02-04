import APIHelper from "./APIHelper";

let nodesArray;
let edgesArray;

function insert(reactflowData) {
  console.log(reactflowData);
  parseReactFlowData(reactflowData);
  sendNodeData(nodesArray);
  sendEdgeData(edgesArray);
}

function parseReactFlowData(reactflowData) {
  nodesArray = reactflowData.jsonData.nodes;
  edgesArray = reactflowData.jsonData.edges;
}

function formatNodeData(node) {
  let json = {
    sequenceId: node.id,
    configId: node.data.configId,
    name: node.data.label,
    typeuuid: node.data.seqType,
    description: "to be implemented in the future",
  };
  let formattedData = JSON.stringify(json);
  return formattedData;
}

function checkForType(node) {
  let endpoint = "";
  console.log(node.name);
  if (node.name == "ControlModule") {
    endpoint = "insertControlModule";
  }
  if (node.name == "Sequence") {
    endpoint = "insertSequence";
  }
  return endpoint;
}

function sendNodeData(nodes) {
  nodes.forEach((node) => {
    let body = formatNodeData(node);
    let endpointToCall = checkForType(node);
    APIHelper.makePost("insertSequence", body);
  });
}

function sendEdgeData(edges) {
  console.log(edges);
  // edges.forEach((edge) => {
  //   let json = {
  //     sourceID:
  //   }
  // })
}

export default {
  insert,
};
