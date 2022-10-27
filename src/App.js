// import React, { useCallback } from "react";
// import ReactFlow, {
//   addEdge,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
// } from "reactflow";

// import {
//   nodes as initialNodes,
//   edges as initialEdges,
// } from "./initial-elements";
// import CustomNode from "./CustomNode";

// import "reactflow/dist/style.css";
// import "./overview.css";

// const nodeTypes = {
//   custom: CustomNode,
// };

// const minimapStyle = {
//   height: 120,
// };

// const onInit = (reactFlowInstance) =>
//   console.log("flow loaded:", reactFlowInstance);

// const OverviewFlow = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   // we are using a bit of a shortcut here to adjust the edge type
//   // this could also be done with a custom edge for example
//   const edgesWithUpdatedTypes = edges.map((edge) => {
//     if (edge.sourceHandle) {
//       const edgeType = nodes.find((node) => node.type === "custom").data
//         .selects[edge.sourceHandle];
//       edge.type = edgeType;
//     }

//     return edge;
//   });

//   return (
//     <div style={{ height: "100%", width: "100%" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edgesWithUpdatedTypes}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onInit={onInit}
//         fitView
//         attributionPosition="top-right"
//         nodeTypes={nodeTypes}
//       >
//         <MiniMap style={minimapStyle} />
//         <Controls />
//         {/* <Background color="#aaa" gap={16} /> */}
//       </ReactFlow>
//     </div>
//   );
// };

// export default OverviewFlow;
import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";

import "./index.css";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
