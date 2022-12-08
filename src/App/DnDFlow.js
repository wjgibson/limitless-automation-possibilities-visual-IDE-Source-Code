import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "../Elements/Sidebar";
import nodeTypes from "../resources/nodeTypes";

import { v4 as uuidv4 } from "uuid";

import "./index.css";

import APIHelper from "../resources/APIHelper";

import { Layout } from "antd";
import CustomMenu from "../Elements/Menu";

const { Header, Content, Footer, Sider } = Layout;

let flowKey = "";

const getId = () => `sequence_${uuidv4()}`;

function setFlowKey(name) {
  flowKey = name;
}

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [collapsed, setCollapsed] = useState(false);

  const onSave = (cid) => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      let json = {
        jsonData: flow,
        cid: cid,
      };
      let body = JSON.stringify(json);
      console.log(`updateConfig json data: ${JSON.stringify(json)}`);
      APIHelper.makePost("updateConfig", body);
    }
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

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: "step", animated: true }, eds)
      ),
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
    <Layout>
      <ReactFlowProvider>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <CustomMenu save={onSave} restore={onRestore}></CustomMenu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" />
          <Content>
            <div className="site-layout-background">
              <div aria-label="rfProvider" className="dndflow">
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
                    <Background color="#00284f" variant="dots" />
                    <Controls />
                  </ReactFlow>
                </div>
                <Sidebar />
              </div>
            </div>
          </Content>
        </Layout>
      </ReactFlowProvider>
    </Layout>
  );
};

export default DnDFlow;
