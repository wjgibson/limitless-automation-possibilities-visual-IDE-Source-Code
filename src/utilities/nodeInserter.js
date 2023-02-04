let nodesArray;
let edgesArray;
let cid;

function insert(reactflowData) {
  console.log(reactflowData);
  parseReactFlowData(reactflowData);
  sendNodeData(nodesArray);
  sendEdgeData(edgesArray);
}
function parseReactFlowData(reactflowData) {
  nodesArray = reactflowData.jsonData.nodes;
  edgesArray = reactflowData.jsonData.edges;
  cid = reactflowData.cid;
}

function sendNodeData(nodes) {
  nodes.forEach((node) => {
    let json = {
      configId: node.data.configId,
      name: node.data.label,
      typeuuid: node.data.seqType,
      description: "to be implemented in the future",
    };
    let body = JSON.stringify(json);
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
