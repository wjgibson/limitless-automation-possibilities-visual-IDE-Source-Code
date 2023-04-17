import APIHelper from "./APIHelper";

let nodesArray;
let edgesArray;
let cid;
let insertEndpoint;

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
    colorInteracted: node.data.colorInteracted,
    nodeType: node.data.nodeType,
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

async function checkForType(node) {
  if (node.nodeType == "Control Module") {
    return "insertControlModule";
  }
  if (node.nodeType == "Sequence") {
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

// async function sendNodeData(nodes) {
//   await prepareNodeTables().then(() => {
//     nodes.forEach((node) => {
//       let body = formatSequenceData(node);
//       console.log(body);
//       setEndpoint(body);
//       // console.log(`endpoint: ${insertEndpoint}`);
//       // APIHelper.makePost(insertEndpoint, JSON.stringify(body));
//     });
//   });
// }

async function sendNodeToAPI(node) {
  let body = formatSequenceData(node);
  console.log(body);
  await checkForType(body).then((endpoint) => {
    console.log(endpoint);
    APIHelper.makePost(endpoint, JSON.stringify(body));
  });
}

async function sendNodeData(nodes) {
  await prepareNodeTables().then(() => {
    nodes.forEach((node) => {
      sendNodeToAPI(node);
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
