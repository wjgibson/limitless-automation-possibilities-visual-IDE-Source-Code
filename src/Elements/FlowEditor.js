import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import nodeTypes from "../utilities/nodeTypes";

import "../App/index.css";

import { v4 as uuidv4 } from "uuid";

import APIHelper from "../utilities/APIHelper";

import nodeInserter from "../utilities/nodeInserter";

const getId = () => `${uuidv4()}`;

const FlowEditor = (props) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showExclamtionOnChange, setShowExclamationOnChange] = useState(false);
  const [editLabel, setEditLabel] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [selectedEdge, setSelectedEdge] = useState(null);


  useEffect(() => {
    onRestore(props.configId);
  }, []);

  useEffect(() => {
    if (props.save) {
      onSave();
      setShowExclamationOnChange(false);
    }
  }, [props.save]);

  useEffect(() => {
    if (nodes.length != 0) {
      setShowExclamationOnChange(true);
    }
  }, [edges, nodes]);

  useEffect(() => {
    if (showExclamtionOnChange == true) {
      props.setShowExclamation(true);
    } else {
      props.setShowExclamation(false);
    }
  }, [showExclamtionOnChange]);


  const onConnect = useCallback(
      (params) => {
        const { source, target } = params;
        const newEdge = {
          id: `${source}-${target}`,
          source: source,
          target: target,
          label: "",
          type: "step",
          animated: true,
          labelStyle: {
            fontWeight: "bold",
          },
          labelBgStyle: {
            fill: "#f8f4f4",
          },
        };
        setEdges((eds) => addEdge(newEdge, eds));
      },
      [setEdges]
  );

  const onSaveLabel = useCallback(() => {
    setEdges((edges) =>
        edges.map((edge) =>
            edge.id === `${selectedEdge.source}-${selectedEdge.target}`
                ? { ...edge, label: newLabel }
                : edge
        )
    );
    setEditLabel(false);
    setNewLabel("");
  }, [selectedEdge, newLabel]);

  const onEdgeDoubleClick = useCallback((event, edge) => {
    setEdges((edges) =>
        edges.map((e) =>
            e.id === edge.id
                ? {
                  ...e,
                  label: (prompt("Enter the new label for the edge", e.label) || e.label)
                      .replace(/\b\w/g, (l) => l.toUpperCase())
                }
                : e
        )
    );
  }, []);

  const onSave = () => {
    if (props.selectedConfig == props.configId) {
      if (reactFlowInstance) {
        const flow = reactFlowInstance.toObject();
        let json = {
          jsonData: flow,
          cid: props.configId,
        };
        console.log(json);
        nodeInserter.insert(json);
      }
    }
    props.setSave(false);
  };

  const onRestore = (cid) => {
    const restoreFlow = async () => {
      const response = await APIHelper.doGet(`getConfigJSON${cid}`);
      const flow = response[0].json;

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };
    restoreFlow();
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      setShowExclamationOnChange(true);

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

      let id;
      const newNode = {
        id: `${getId()}`,
        type,
        position,
        data: { label: `${type} node`, configId: props.configId },
        dragHandle: ".drag-handle",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="site-layout-background">
      <div aria-label="rfProvider" className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onEdgeDoubleClick={onEdgeDoubleClick}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              deleteKeyCode={["Backspace"]}
              fitView
            >
              <Controls position="top-left" />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <Sidebar />
      </div>
    </div>
  );
};

export default FlowEditor;
