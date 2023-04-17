import React, { useState, useRef, useCallback, useEffect } from "react";
import { Button, Modal } from "antd";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import resetStepNode from "./ResetStepNode.js";
import nextStepNode from "./NextStepNode.js";

let curID = 3;
const initialNodes = [];
const initialEdges = [];
const nodeTypes = { ResetStep: resetStepNode, NextStep: nextStepNode };

const stepsModal = (props) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [checkEdges, setCheckEdges] = useState(false);
  const [addedStep, setaddedStep] = useState(false);
  const [addedEdge, setaddedEdge] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback((changes) => {
    setCheckEdges(true);
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((params) => {
    setCheckEdges(true);
    setEdges((eds) => addEdge(params, eds));
  }, []);

  useEffect(() => {
    console.log("checkEdges changed:", checkEdges);
  }, [checkEdges]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  let nodeName = props.nodeName;

  const handleOk = () => {
    setIsModalOpen(false);
    props.setmodalopen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    props.setmodalopen(false);
  };
  useEffect(() => {
    if (props.ismodalopen == true) {
      setIsModalOpen(true);
    }
  }, [props.ismodalopen]);

  function addResetStep() {
    setNodes(
      nodes.concat({
        id: "Reset" + curID.toString(),
        type: "ResetStep",
        data: { label: "Reset" },
        position: { x: 100, y: 100 },
      })
    );
    curID += 1;
  }

  function addNextStep() {
    setaddedStep(true);
    setaddedEdge(true);
    setNodes(
      nodes.concat({
        id: "Next" + curID.toString(),
        type: "NextStep",
        data: {
          label: "Next",
          nodes: nodes,
          edges: edges,
          setEdges: setEdges,
          setNodes: setNodes,
          checkEdges: checkEdges,
          setCheckEdges: setCheckEdges,
        },
        position: { x: 100, y: 100 },
      })
    );
    curID += 1;
  }

  useEffect(() => {
    if (addedEdge) {
      nodes.forEach((node) => {
        node.data.edges = edges;
      });
      setaddedEdge(false);
    }
  }, [edges]);

  useEffect(() => {
    if (addedStep) {
      nodes.forEach((node) => {
        node.data.nodes = nodes;
      });
      setaddedStep(false);
    }
  }, [nodes]);

  return (
    <Modal
      title={"Steps for " + nodeName}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1250}
    >
      <div className="site-layout-background">
        <Button onClick={addResetStep}>Reset Step</Button>
        <Button onClick={addNextStep}>Next Step</Button>
        <Button onClick={(e) => console.log(edges)}>Print</Button>
        <div
          aria-label="rfProvider"
          className="dndflow"
          style={{ height: 700 }}
        >
          <ReactFlowProvider>
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                deleteKeyCode={["Delete", "Backspace"]}
                fitView
              >
                <Controls />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </div>
      </div>
    </Modal>
  );
};

export default stepsModal;
