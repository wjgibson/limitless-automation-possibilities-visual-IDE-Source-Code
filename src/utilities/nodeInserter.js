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
      id: node.id,
      name: node.data.label,
      type: node.type,
      level: node.data.seqType,
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
