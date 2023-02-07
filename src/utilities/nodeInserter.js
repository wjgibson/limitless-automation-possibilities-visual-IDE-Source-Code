import APIHelper from "./APIHelper";

let nodesArray;
let edgesArray;
let cid;

function insert(reactflowData) {
  parseReactFlowData(reactflowData);
  sendNodeData(nodesArray);
  sendEdgeData(edgesArray);
}

function parseReactFlowData(reactflowData) {
  console.log(reactflowData);
  nodesArray = reactflowData.jsonData.nodes;
  edgesArray = reactflowData.jsonData.edges;
  cid = reactflowData.cid;
  console.log(nodesArray);
}

function formatSequenceData(node) {
  let json = {
    Id: node.id,
    configId: node.data.configId,
    name: node.data.label,
    typeuuid: node.data.type,
    description: "to be implemented in the future",
  };
  console.log(json);
  return json;
}

function formatEdgeData(edge) {
  let json = {
    parentNodeId: edge.source,
    childNodeId: edge.target,
    configuuid: cid,
  };
  return json;
}

function checkForType(node) {
  if (node.name == "controlModule node") {
    return "insertControlModule";
  }
  if (node.name == "sequence node") {
    return "insertSequence";
  }
}

function sendNodeData(nodes) {
  prepareTableForInsert("Sequence");
  prepareTableForInsert("ControlModule");
  nodes.forEach((node) => {
    let body = formatSequenceData(node);
    let endpointToCall = checkForType(body);
    APIHelper.makePost(endpointToCall, JSON.stringify(body));
  });
}

function sendEdgeData(edges) {
  prepareTableForInsert("SubSeq");
  edges.forEach((edge) => {
    let body = formatEdgeData(edge);
    APIHelper.makePost("insertSubSequence", JSON.stringify(body));
  });
}

function prepareTableForInsert(table) {
  let body = {
    configuuid: cid,
  };
  APIHelper.makePost(`prepare${table}Table`, JSON.stringify(body));
}

export default {
  insert,
};
