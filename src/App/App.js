import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "../Elements/Sidebar";

import "./index.css";

let flowKey = "";

let id = 0;
const getId = () => `dndnode_${id++}`;

function setFlowKey(name) {
  flowKey = name;
}

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      let name = prompt("Configuration Name");
      setFlowKey(name);
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log(JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      console.log(window.localStorage);
      let restoreName = prompt("Configuration to restore");
      setFlowKey(restoreName);
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };

    restoreFlow();
  }, [setNodes]);

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
            deleteKeyCode={["Delete", "Backspace"]}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <div className="save__controls">
          <button onClick={onSave}>save</button>
          <button onClick={onRestore}>restore</button>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
