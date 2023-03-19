import APIHelper from "./APIHelper";

let nodesArray;
let edgesArray;
let cid;

async function insert(reactflowData) {
  parseReactFlowData(reactflowData);
  sendReactflowData(reactflowData);
  await sendNodeData(nodesArray).then(() => {
    sendEdgeData(edgesArray);
  });
}

function parseReactFlowData(reactflowData) {
  nodesArray = reactflowData.jsonData.nodes;
  edgesArray = reactflowData.jsonData.edges;
  cid = reactflowData.cid;
}

function formatSequenceData(node) {
  console.log(node);
  let json = {
    Id: node.id,
    configId: node.data.configId,
    name: node.data.name,
    typeuuid: node.data.type.split("|")[0],
    description: "to be implemented in the future",
    color: node.data.color,
  };
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

async function sendReactflowData(reactflowData) {
  let body = {
    jsonData: reactflowData.jsonData,
    cid: cid,
  };
  let json = JSON.stringify(body);
  await APIHelper.makePost("updateConfig", json);
}

async function prepareNodeTables() {
  await prepareTableForInsert("Sequence");
  await prepareTableForInsert("ControlModule");
}

async function sendNodeData(nodes) {
  await prepareNodeTables().then(() => {
    nodes.forEach((node) => {
      let body = formatSequenceData(node);
      let endpointToCall = checkForType(body);
      APIHelper.makePost(endpointToCall, JSON.stringify(body));
    });
  });
}

async function sendEdgeData(edges) {
  let response = "";
  await prepareTableForInsert("SubSeq").then(() => {
    edges.forEach((edge) => {
      let body = formatEdgeData(edge);
      response = APIHelper.makePost("insertSubSequence", JSON.stringify(body));
    });
  });
  console.log(response);
}

async function prepareTableForInsert(table) {
  let body = {
    configuuid: cid,
  };
  await APIHelper.makePost(`prepare${table}Table`, JSON.stringify(body));
}

//exports for testing
export {
  parseReactFlowData,
  formatSequenceData,
  formatEdgeData,
  checkForType,
  sendReactflowData,
  prepareNodeTables,
  sendNodeData,
  sendEdgeData,
  prepareTableForInsert,
};
//export for production code
export default {
  insert,
};
