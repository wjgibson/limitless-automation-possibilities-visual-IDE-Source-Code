import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";
import nodeTypes from "../resources/nodeTypes";

import "../App/index.css";

import { v4 as uuidv4 } from "uuid";

import APIHelper from "../resources/APIHelper";

const getId = () => `sequence_${uuidv4()}`;

const FlowEditor = (props) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [showExclamtionOnChange, setShowExclamationOnChange] = useState(false);

  useEffect(() => {
    onRestore(props.configId);
  }, []);

  useEffect(() => {
    if (props.save) {
      onSave();
      setShowExclamationOnChange(false)
    }
  }, [props.save]);

  useEffect(()=>{
    setShowExclamationOnChange(true)
    },[edges,nodes])

  useEffect(() =>{
    if (showExclamtionOnChange == true){
      props.setShowExclamation(true)
      
    }
    else{
      props.setShowExclamation(false)
    }
  },[showExclamtionOnChange]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: "step", animated: true }, eds)
      ),
    []
  );

  const onSave = () => {
    if (props.selectedConfig == props.configId) {
      if (reactFlowInstance) {
        const flow = reactFlowInstance.toObject();
        let json = {
          jsonData: flow,
          cid: props.configId,
        };
        let body = JSON.stringify(json);
        console.log(`updateConfig json data: ${JSON.stringify(json)}`);
        APIHelper.makePost("updateConfig", body);
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
      setShowExclamationOnChange(true)


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
        id: `${getId()}`,
        type,
        position,
        data: { label: `${type} node` },
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
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              deleteKeyCode={["Delete", "Backspace"]}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
        <Sidebar />
      </div>
    </div>
  );
};

export default FlowEditor;
